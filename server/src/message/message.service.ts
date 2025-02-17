import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { SendMessageRequest } from "request/message.request";
import { ConsumerService } from "src/common/consumer.service";
import { PrismaService } from "src/common/prisma.service";
import { ProducerService } from "src/common/producer.service";
import { Logger } from "winston";

@Injectable()
export class MessageService implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    private prismaService: PrismaService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ["kafka-test"] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          this.logger.info(`Receiving message ${message.value.toString()}, topic ${topic}, partition ${partition}`);

          await this.prismaService.message.create({
            data: {
              key: message.key.toString(),
              text: message.value.toString(),
            }
          })
        }
      }
    );
  }

  async sendMessage(request: SendMessageRequest) {
    this.logger.info(`service.sendMessage - incoming request ${JSON.stringify(request)}`)

    await this.producerService.produce({
      topic: "kafka-test",
      messages: [{ key: request.key, value: request.value }]
    });

    this.logger.info("Message sent...")
  }

  async getMessages() {
    return await this.prismaService.message.findMany();
  }
}