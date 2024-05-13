import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username)

    const isValid = await argon2.verify(user.password, password)
    if (!isValid) throw new UnauthorizedException()
    const payload = { sub: user.id, username: user.username }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
