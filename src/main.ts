import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import morgan from 'morgan'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import bodyParser from 'body-parser'

import { AppModule } from './app.module'
import { AppConfigService } from './config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(logger)
  app.setGlobalPrefix('/api/v1')
  app.enableCors()

  app.use(
    morgan(
      ':remote-addr :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
      {
        stream: {
          write: (message: any) => logger.log(message, 'Client'),
        },
      },
    ),
  )

  //for typeform token validation
  app.use(
    bodyParser.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf
      },
    }),
  )

  const options = new DocumentBuilder()
    .setTitle('Student Management System Backend')
    .setDescription('REST APIs for Student Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const apiDocs = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, apiDocs)

  const config = app.get<AppConfigService>(AppConfigService)
  const port = config.get<number>('SERVER_PORT', 8080)
  await app.listen(port)
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap()
