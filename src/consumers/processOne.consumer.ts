import { EQueueNames } from "../enums/queues.enum";
import { IConsumer } from "../interfaces/consumers/consumer.interface";
import { ConsumerChannelProps } from "../interfaces/servers/amqpServer.interface";
import { MessageProccess1 } from "../types/queueMessage.type";

export class ProcessOneConsumer implements IConsumer {
  public readonly queueName: EQueueNames = EQueueNames.processOne;
  constructor() {}

  public runProcess(message: MessageProccess1, ack: ConsumerChannelProps) {
    console.log(message);
    ack.acknowledge();
  }
}

export const processOneConsumer = new ProcessOneConsumer();
