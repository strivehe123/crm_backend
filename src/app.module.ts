import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { DepartmentModule } from './department/department.module'
import { RoleModule } from './role/role.module'
import { MenuModule } from './menu/menu.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { connectionParams } from 'ormconfig'
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionParams), UserModule, DepartmentModule, RoleModule, MenuModule, AuthModule, CaslModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
