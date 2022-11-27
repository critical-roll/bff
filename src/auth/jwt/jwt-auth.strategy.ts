import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = { sub: number; username: string };

const extractJwtFromCookie = (req: FastifyRequest) => {
  let token = null;
  if (req && req.cookies && req.cookies.token) {
    const result = req.unsignCookie(req.cookies.token);
    if (result.valid) {
      token = result.value;
    }
  }
  return token;
};

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: FastifyRequest, payload: JwtPayload) {
    return { id: payload.sub, username: payload.username, token: extractJwtFromCookie(request) };
  }
}
