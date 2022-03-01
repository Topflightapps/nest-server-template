import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser (email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const hash = crypto.createHash('sha256');
    const hashPassword = hash.update(pass).digest('hex');
    if (user && user.password === hashPassword) {
      const {password, ...result} = user;
      return result
    }
    return null;
  }
}