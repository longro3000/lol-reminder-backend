import { SetMetadata } from '@nestjs/common'

import { NO_AUTH } from './auth.const'

const BypassAuth = () => SetMetadata(NO_AUTH, true)
export default BypassAuth