import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console()
      ]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [
    PrismaService,
    ConsumerService,
    ProducerService,
  ],
  exports: [
    PrismaService,
    ConsumerService,
    ProducerService,
  ],
})
export class CommonModule {}
