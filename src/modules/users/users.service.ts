import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async createUser(options: CreateUserOptions): Promise<Users> {
    const user = this.usersRepository.create(options);
    await this.usersRepository.save(user);
    return user
  }
}
