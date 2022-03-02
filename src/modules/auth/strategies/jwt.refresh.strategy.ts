import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as config from 'config';
import * as crypto from 'crypto';
import { UsersService } from 'src/modules/users/users.service';
import CustomError from 'src/utils/customError';

const JWT_CONSTANTS: any = config.get('jwt');

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-strategy') {
  constructor(
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.refresh_token_secret,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: any) {
    const hash = crypto.createHash('sha256');
    const refreshToken = req.headers.authorization.split(" ")[1];
    const refreshTokenHash = hash.update(refreshToken).digest('hex');
    const email: string = payload.email;
    const user = await this.usersService.findOne(email);
    if (refreshTokenHash !== user.refreshToken) {
      throw new UnauthorizedException();
    }
    return { payload };
  }
}
