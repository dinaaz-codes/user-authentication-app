import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('jwt-rt') {
  constructor() {
    super();
  }
}
