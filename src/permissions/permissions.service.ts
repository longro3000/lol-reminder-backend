import { Injectable } from '@nestjs/common'

import { PERMISSION_GROUPS } from './permissions.const'

@Injectable()
export class PermissionsService {
  getPermissions() {
    return PERMISSION_GROUPS
  }
}
