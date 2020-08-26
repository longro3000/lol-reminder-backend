import { Get } from '@nestjs/common'
import { CrudActions } from '@nestjsx/crud'

import { PermissionsService } from './permissions.service'
import { AppCrudController } from '../app.decorator'
import { AppFeature } from '../app.type'
import WithPermissions from '../auth/with-permission.decorator'

@AppCrudController(AppFeature.Permissions)
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}

  @Get()
  @WithPermissions(CrudActions.ReadAll)
  getAll() {
    return this.permissionService.getPermissions()
  }
}
