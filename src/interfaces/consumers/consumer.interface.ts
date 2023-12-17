import { EQueueNames } from "../../enums/queues.enum";
import { QueueMessage } from "../../types/queueMessage.type";
import { ConsumerChannelProps } from "../servers/amqpServer.interface";

export interface IConsumer {
  queueName: EQueueNames;
  runProcess(message: QueueMessage, ack: ConsumerChannelProps): void;
}
