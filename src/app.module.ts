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
      
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
