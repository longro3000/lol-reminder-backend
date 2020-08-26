import {
  CrudController,
  Override,
  ParsedRequest,
  CrudRequest,
  ParsedBody,
} from '@nestjsx/crud'
import { Param, ForbiddenException } from '@nestjs/common'

import { RolesService } from './roles.service'
import { Role } from './role.entity'
import { AppCrudController } from '../app.decorator'
import { AppFeature } from '../app.type'
import { SUPER_ADMIN } from './roles.const'

@AppCrudController(AppFeature.Roles, {
  model: {
    type: Role,
  },
})
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}

  get base(): CrudController<Role> {
    return this
  }

  async preventSuperAdminChange(id: string, payload?: any) {
    const role = await this.service.findOne({ id })
    if (
      role?.name === SUPER_ADMIN &&
      (!payload || (payload.name && payload.name !== SUPER_ADMIN))
    ) {
      throw new ForbiddenException('Can not change super admin role')
    }
  }

  @Override()
  async deleteOne(
    @ParsedRequest() parsedReq: CrudRequest,
    @Param('id') id: string,
  ) {
    await this.preventSuperAdminChange(id)
    return this.base.deleteOneBase!(parsedReq)
  }

  @Override()
  async updateOne(
    @ParsedRequest() parsedReq: CrudRequest,
    @Param('id') id: string,
    @ParsedBody() dto: any,
  ) {
    await this.preventSuperAdminChange(id, dto)
    return this.base.updateOneBase!(parsedReq, dto)
  }

  @Override()
  async replaceOne(
    @ParsedRequest() parsedReq: CrudRequest,
    @Param('id') id: string,
    @ParsedBody() dto: any,
  ) {
    await this.preventSuperAdminChange(id, dto)
    return this.base.replaceOneBase!(parsedReq, dto)
  }
}
