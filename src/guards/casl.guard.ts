import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory'

import { CHECK_POLICIES_KEY, CaslHandlerType } from 'src/decorators/casl.decorator'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityService: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers = this.reflector.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.HANDLER, [
      context.getHandler(),
      context.getClass()
    ])
    const canHandlers = this.reflector.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.CAN, [
      context.getHandler(),
      context.getClass()
    ]) as CaslHandlerType
    const cannotHandlers = this.reflector.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.CANNOT, [
      context.getHandler(),
      context.getClass()
    ]) as CaslHandlerType
    if (!handlers || !canHandlers || !cannotHandlers) {
      return true
    }

    const req = context.switchToHttp().getRequest()

    if (!req.user) return false
    const ability = await this.caslAbilityService.createForUser(req.user.username)
    let flag = true

    if (handlers) {
      flag = flag && handlers.every((handler) => handler(ability))
    }
    if (flag && canHandlers) {
      if (canHandlers instanceof Array) {
        flag = flag && canHandlers.every((handler) => handler(ability))
      } else if (typeof canHandlers === 'function') {
        flag = flag && canHandlers(ability)
      }
    }
    if (flag && cannotHandlers) {
      if (cannotHandlers instanceof Array) {
        flag = flag && cannotHandlers.every((handler) => handler(ability))
      } else if (typeof cannotHandlers === 'function') {
        flag = flag && cannotHandlers(ability)
      }
    }

    return flag
  }
}
