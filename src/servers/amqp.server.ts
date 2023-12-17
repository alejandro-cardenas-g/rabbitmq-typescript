import {
  IAmqpServerConfig,
  IExchangeOptions,
} from "../interfaces/servers/amqpServer.interface";
import amqp, { Channel } from "amqplib";
import { QueueMessage } from "../types/queueMessage.type";
import { IConsumer } from "../interfaces/consumers/consumer.interface";
import { EQueueNames } from "../enums/queues.enum";
import { QUEUE_CONFIG } from "../config/queues.config";

export class AmqpServer {
  private queues: Set<string> = new Set();
  private exchanges: Set<string> = new Set();
  private channel: Channel;
  private connection: amqp.Connection;
  constructor(private readonly config: IAmqpServerConfig) {}

  public async init(cb?: () => void) {
    if (!this.connection) {
      this.connection = await amqp.connect(this.config);
      this.channel = await this.connection.createChannel();
    }
    if (cb) cb();
  }

  public async addConsumer(consumer: IConsumer) {
    if (!this.connection) await this.init();
    const queueOption = QUEUE_CONFIG.find(
      ({ queueName }) => queueName === consumer.queueName
    );
    if (!queueOption) return;
    await this.configure(queueOption.exchangeProvider, consumer.queueName);
    await this.channel.bindQueue(
      consumer.queueName,
      queueOption.exchangeProvider.name,
      queueOption.routingKey
    );
    this.channel.consume(consumer.queueName, (message) => {
      if (!message) return;
      console.log(`Consumer added with Queue: ${consumer.queueName}`);
      const content = JSON.parse(message.content.toString());
      consumer.runProcess(content, {
        acknowledge: () => this.channel.ack(message),
        reject: (requeue: boolean) => this.channel.reject(message, requeue),
      });
    });
  }

  private async checkOrCreateExchange(exchangeOption: IExchangeOptions) {
    if (!this.exchanges.has(exchangeOption.name)) {
      this.exchanges.add(exchangeOption.name);
      await this.channel.assertExchange(
        exchangeOption.name,
        exchangeOption.type
      );
    }
  }

  private async checkOrCreateQueue(queueName: EQueueNames) {
    if (!this.queues.has(queueName)) {
      this.queues.add(queueName);
      await this.channel.assertQueue(queueName);
    }
  }

  private async configure(
    exchangeOption: IExchangeOptions,
    queueName: EQueueNames
  ) {
    await Promise.all([
      this.checkOrCreateExchange(exchangeOption),
      this.checkOrCreateQueue(queueName),
    ]);
  }

  public async sendMessage<T extends QueueMessage>(
    queueName: EQueueNames,
    message: T
  ) {
    if (!this.connection) await this.init();
    const queueOption = QUEUE_CONFIG.find(
      (options) => options.queueName === queueName
    );
    if (!queueOption) return;
    await this.configure(queueOption.exchangeProvider, queueName);
    const resp = await this.channel.publish(
      queueOption.exchangeProvider.name,
      queueOption.routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    if (!resp) console.error("message not sent");
  }
}
