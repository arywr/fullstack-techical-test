import { PrismaClient, Prisma } from '@prisma/client';
import { Logger } from 'winston';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
// @ts-ignore
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    super({
      log: [
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
        { emit: "event", level: "query" },
      ]
    });
  }
  
  onModuleInit() {
    this.$on("info", (event) => this.logger.info(event));
    this.$on("warn", (event) => this.logger.warn(event));
    this.$on("error", (event) => this.logger.error(event));
    this.$on("query", (event) => this.logger.info(event));
  }
}