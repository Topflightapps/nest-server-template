import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly appService: UsersService) { }

  @Get()
  async getUsers(@Res() response: Response): Promise<any> {
    try {
      const users = await this.appService.findAll();
      return response.status(HttpStatus.OK).send({ users })
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message
      })
    }
  }

  @Post()
  async createUser(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {
      const user = await this.appService.createUser(request.body);
      return response.status(HttpStatus.OK).send({
        message: "User added",
        user
      })
      
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message
      })
    }
  }
}
