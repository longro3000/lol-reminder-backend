import { Module, forwardRef, HttpModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotePackModule } from '../note-pack/note-pack.module'
import { MatchService } from './match.service'
import { Match } from './match.entity'
import { MatchController } from './match.controller'
import { MatchNotePackModule } from 'src/match-notePack/match-notePack.module'
import { AppConfigModule } from 'src/config/config.module'
import { AppConfigService } from 'src/config/config.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    MatchNotePackModule,
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        headers: {
          'X-Riot-Token': configService.get('riotToken')
        },
        timeout: 7000,
        maxRedirects: 5
      }),
      inject: [AppConfigService]
    }),
    forwardRef(() => NotePackModule)
  ],
  providers: [MatchService],
  controllers: [MatchController],
  exports: [MatchService]
})
export class MatchModule {}