import { EQueueNames } from "../enums/queues.enum";
import { IConsumer } from "../interfaces/consumers/consumer.interface";
import { ConsumerChannelProps } from "../interfaces/servers/amqpServer.interface";
import { MessageProccess2 } from "../types/queueMessage.type";

export class ProcessTwoConsumer implements IConsumer {
  public readonly queueName: EQueueNames = EQueueNames.processTwo;
  constructor() {}

  public runProcess(message: MessageProccess2, ack: ConsumerChannelProps) {
    console.log(message.ids.length);
    ack.acknowledge();
  }
}

export const processTwoConsumer = new ProcessTwoConsumer();
