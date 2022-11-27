import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly configService: ConfigService, private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    const ui = this.configService.get<string>('UI_URL');
    const maxAge = Number(this.configService.get<number>('SESSION_EXPIRES_IN'));
    res.setCookie('token', accessToken, {
      domain: 'localhost',
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      signed: true,
      maxAge: maxAge,
    });

    res.status(302).redirect(ui);
    res.end();
  }
}
