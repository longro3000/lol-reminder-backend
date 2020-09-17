import { SetMetadata } from '@nestjs/common'

import { PERMISSIONS, ANY_PERMISSION } from './auth.const'

const BypassPermissions = () => SetMetadata(PERMISSIONS, [ANY_PERMISSION])
export default BypassPermissions
