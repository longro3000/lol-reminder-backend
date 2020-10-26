import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppConfigService } from './config/config.service';
import { AppConfigModule } from './config/config.module';
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule, utilities } from 'nest-winston'
import winston from 'winston'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.typeOrmConfig
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        const config: any = {
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike()
              )
            })
          ]
        }
        const graylogHost = configService.get<string>('GRAYLOG_HOST')
        if (graylogHost) {
          config.format = winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.metadata()
          )
        }
        return config
      },
      imports: [AppConfigModule],
      inject: [AppConfigService]
    }),
    UserModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
