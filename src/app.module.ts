

import { AppConfigService } from './config/config.service';
import { AppConfigModule } from './config/config.module';
import { Module, HttpModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule, utilities } from 'nest-winston'
import winston from 'winston'
import WinstonGraylog2 from '@ngocketit/winston-graylog2'

import { NotePackModule } from './note-pack/note-pack.module'
import { MatchModule } from './match/match.module'
import { UserNotePackModule } from './user-notePack/user-notePack.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { MatchNotePackModule } from './match-notePack/match-notePack.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.typeOrmConfig
    }),
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        headers: {
          'X-Riot-Token': configService.riotToken
        },
        timeout: 7000,
        maxRedirects: 5
      }),
      inject: [AppConfigService]
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        const config: any = {
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(),
              ),
            }),
          ],
        }
        const graylogHost = configService.get<string>('GRAYLOG_HOST')

        if (graylogHost) {
          config.transports.push(
            new WinstonGraylog2({
              graylog: {
                servers: [
                  {
                    host: graylogHost,
                    port: configService.get<number>('GRAYLOG_PORT', 12201),
                  },
                ],
              },
            }),
          )
          config.format = winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.metadata(),
          )
        }
        return config
      },
      imports: [AppConfigModule],
      inject: [AppConfigService],
    }),
    UserModule,
    AuthModule,
    UserNotePackModule,
    MatchNotePackModule,
    MatchModule,
    NotePackModule
  ],
})
export class AppModule {}
