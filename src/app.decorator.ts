import { CrudOptions, Feature, Crud } from '@nestjsx/crud'
import { Controller, applyDecorators, UseGuards, Inject } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

import { AppFeature } from './app.type'
import { UserType } from './auth/auth.type'
import { JwtAuthGuard } from './auth/jwt.guard'
import { WithUserTypes } from './auth/with-usertypes.decorator'

export const AppCrudController = (
  feature: AppFeature,
  crudOptions?: CrudOptions,
  userTypes: UserType | UserType[] = UserType.User,
) => {
  const decorators = [
    Controller(feature),
    Feature(feature)
  ]

  const types: UserType[] =
    typeof userTypes === 'object' ? userTypes : [userTypes]

  if (types.length > 0) {
    decorators.push(WithUserTypes(types[0], ...types.slice(1)))
  }

  decorators.push(UseGuards(JwtAuthGuard))

  if (crudOptions) {
    const idParam = {
      type: 'uuid',
      primary: true,
      field: 'id',
    }

    if (crudOptions.params) {
      if (!crudOptions.params.id) {
        crudOptions.params.id = idParam as any
      }
    } else {
      crudOptions.params = {
        id: idParam as any,
      }
    }
    decorators.unshift(Crud(crudOptions))
  }

  return applyDecorators(...decorators)
}

export const InjectLogger = () => Inject(WINSTON_MODULE_PROVIDER)
