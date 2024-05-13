import { Global, Module } from '@nestjs/common'
import { CaslAbilityFactory } from './casl-ability.factory'
import { UserModule } from 'src/user/user.module'
import { MenuModule } from 'src/menu/menu.module'

@Global()
@Module({
  imports: [UserModule, MenuModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class CaslModule {}
