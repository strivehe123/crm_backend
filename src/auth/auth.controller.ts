import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-auth.dto'
import { CreateUserDto } from './dto/create-auth.dto'
import { UserService } from 'src/user/user.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('鉴权接口')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signin')
  signin(@Body() user: LoginUserDto) {
    const { username, password } = user
    return this.authService.signIn(username, password)
  }
  @Post('signup')
  signup(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }
}
