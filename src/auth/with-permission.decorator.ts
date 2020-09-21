import { SetMetadata } from '@nestjs/common'

import { PERMISSIONS } from './auth.const'

const WithPermissions = (perm: string, ...others: string[]) =>
  SetMetadata(PERMISSIONS, others.concat(perm))
export default WithPermissions
