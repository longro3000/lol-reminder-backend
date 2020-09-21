import { SetMetadata } from '@nestjs/common'

import { UserType } from './auth.type'

export const WithUserTypes = (userType: UserType, ...others: UserType[]) =>
  SetMetadata('USER_TYPES', others.concat(userType))
