import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from './role.entity'
import { BaseCrudService } from '../base.service'

@Injectable()
export class RolesService extends BaseCrudService<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo)
  }
}
