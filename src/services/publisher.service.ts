import { amqpServerConfig } from "../config/amqpServer.config";
import { EQueueNames } from "../enums/queues.enum";
import { AmqpServer } from "../servers/amqp.server";
import { QueueMessage } from "../types/queueMessage.type";

export class PublisherService {
  private readonly amqpServer: AmqpServer;
  constructor() {
    this.amqpServer = new AmqpServer(amqpServerConfig);
  }

  publishMessage<T extends QueueMessage>(queue: EQueueNames, message: T) {
    this.amqpServer.sendMessage<T>(queue, message);
  }
}

export const publisherService = new PublisherService();
