import { Injectable } from '@nestjs/common';

@Injectable()
export class MockConfigService {
  get(key: string) {
    if (key === 'PORT') {
      return 4000;
    }
  }
}
