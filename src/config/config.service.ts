import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UserType } from '../auth/auth.type'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    const env = this.configService.get<string>('NODE_ENV')

    return !env || ['development', 'dev'].includes(env.toLowerCase())
  }

  get isProduction(): boolean {
    const env = this.configService.get<string>('NODE_ENV')

    return !env || ['production', 'prod'].includes(env.toLowerCase())
  }

  get riotToken(): string {
    return this.configService.get<string>('RIOT_TOKEN')
  }

  getJwtSecrect(userType: UserType): string {
    return this.configService.get<string>(
      'JWT_SECRET_' + userType.toUpperCase(),
      `${userType}-secrets`
    )
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres' as const,
      host: this.configService.get<string>('TYPEORM_HOST'),
      port: this.configService.get<number>('TYPEORM_PORT'),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      synchronize: this.configService.get<boolean>('TYPEORM_SYNCHRONIZE', true),
      autoLoadEntities: this.configService.get<boolean>('TYPEORM_AUTOLOAD_ENTITIES', true),
      keepConnectionAlive: this.configService.get<boolean>('TYPEORM_KEEP_CONNECTION_ALIVE', false) 
    }
  }

  get<T>(name: string): T | undefined
  get<T>(name: string, defaultValue?: T): T
  get<T>(name: string, defaultValue?: T): T | undefined {
    if (defaultValue) {
      return this.configService.get<T>(name, defaultValue)
    }
    return this.configService.get<T>(name)
  }

  getOrThrow<T = any>(name: string): T | never {
    const value = this.configService.get<T>(name)
    if (!value) {
      throw new Error(`Config value for ${name} not set`)
    }
    return value
  }
}