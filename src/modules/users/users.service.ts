import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Users } from '../../database/entity/User'
import CustomError from 'src/utils/customError';

type CreateUserOptions = {
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  password: string
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
  findOne(email: string): Promise<Users> {
    return this.usersRepository.findOne({ email });
  }
  findById(id: number): Promise<Users> {
    return this.findById(id);
  }
  async createUser(options: CreateUserOptions): Promise<Users> {
    const hash = crypto.createHash('sha256');
    try {
      const existUser = await this.usersRepository.findOne({email: options.email})
      if (existUser) {
        throw new CustomError("An account with the given email already exists",400)
      }
      options.password = hash.update(options.password).digest('hex');
      const user = this.usersRepository.create(options);
      await this.usersRepository.save(user);
      return user
    } catch (error) {
      throw new CustomError(error.message,error.statusCode || 500);
    }
  }

  async updateRefreshToken(token: string, id: string) {
    const hash = crypto.createHash('sha256');
    token = hash.update(token).digest('hex');
    await this.usersRepository.update(id, { refreshToken: token });
  }
}
