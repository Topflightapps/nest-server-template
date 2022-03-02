import { Controller, Get, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { JwtRefreshGuard } from './modules/auth/guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)

  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    const result = await this.authService.getUserTokens(req.user);
    return res.status(HttpStatus.OK).send({ ...result })
    
  }
  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  async refreshToken(@Request() req, @Response() res) {
    try {
      const result = await this.authService.getUserTokens(req.user.payload);
      return res.status(HttpStatus.OK).send({ ...result })
    } catch (error) {
      return res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          message: error.message
        })
    }
  }

  @UseGuards(JwtAuthGuard) //protected endpoint example
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
