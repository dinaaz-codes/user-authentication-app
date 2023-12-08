import { Injectable, Logger } from '@nestjs/common';
import { UnauthorizedError } from 'src/common/errors/custom.error';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async validatePassword(hashPassword, candidatePassword) {
    return await bcrypt.compare(candidatePassword, hashPassword);
  }

  async signIn(email: string, password: string): Promise<{ accessToken }> {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user || !(await this.validatePassword(user.password, password)))
        throw new UnauthorizedError('invalid user credentails');

      const userData = this.userService.excludeSensitiveInfo(user);
      const payload = { sub: userData.id, email: userData.email };
      const accessToken = await this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } catch (error) {
      this.logger.error(`something went wrong in signIn`, error, [{ email }]);
      throw error;
    }
  }
}
