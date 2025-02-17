import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CitizenModule } from './citizen/citizen.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [CommonModule, CitizenModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
