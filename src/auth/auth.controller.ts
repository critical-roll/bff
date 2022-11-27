import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('logout')
  async auth(@Res() res: FastifyReply) {
    const ui = this.configService.get<string>('UI_URL');
    res.clearCookie('token');
    res.status(302).redirect(ui);
    res.end();
  }
}
