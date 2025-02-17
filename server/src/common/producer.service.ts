import { Kafka, Producer, ProducerRecord } from "kafkajs";
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ["kafka_container:9093"],
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async produce(record: ProducerRecord) {
    this.producer.send(record);
  }
}
