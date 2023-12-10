import { Module } from '@nestjs/common';
import { GreetingController } from './greeting.controller';

@Module({
  controllers: [GreetingController],
})
export class GreetingModule {}
