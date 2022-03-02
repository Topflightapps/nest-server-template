import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as config from 'config';
const JWT_CONSTANTS: any = config.get('jwt');
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const hash = crypto.createHash('sha256');
    const passwordHash = hash.update(password).digest('hex');
    const user = await this.usersService.findOne(username);
    if (user && user.password === passwordHash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getUserTokens(user: any) {
    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret : JWT_CONSTANTS.access_token_secret,
      expiresIn: JWT_CONSTANTS.access_token_expiration
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret : JWT_CONSTANTS.refresh_token_secret,
      expiresIn: JWT_CONSTANTS.refresh_token_expiration
    });
    await this.usersService.updateRefreshToken(refreshToken,user.id);
    return {
      accessToken,
      refreshToken
    };
  }
}
