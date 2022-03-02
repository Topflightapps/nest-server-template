import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Users } from '../../database/entity/User'

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
    return this.usersRepository.findOne({email});
  }
  findById(id: string): Promise<Users> {
    return this.findById(id);
  }
  async createUser(options: CreateUserOptions): Promise<Users> {
    const hash = crypto.createHash('sha256');
    options.password = hash.update(options.password).digest('hex');
    const user = this.usersRepository.create(options);
    await this.usersRepository.save(user);
    return user
  }
}
