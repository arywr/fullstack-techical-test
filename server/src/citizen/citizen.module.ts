import { Module } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';

@Module({
  imports: [],
  providers: [CitizenService],
  controllers: [CitizenController],
})
export class CitizenModule {}
