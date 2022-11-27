import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../features/users/user.entity';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    const res = {
      accessToken: this.jwtService.sign(payload),
    };

    return res;
  }
}
