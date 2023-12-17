import { EQueueNames, ERoutingKeys } from "../enums/queues.enum";
import { IQueues } from "../interfaces/servers/amqpServer.interface";
import { exchangeDirectProvider } from "./amqpServer.config";

export const QUEUE_CONFIG: IQueues[] = [
  {
    queueName: EQueueNames.processOne,
    routingKey: ERoutingKeys.routingOne,
    exchangeProvider: exchangeDirectProvider,
  },
  {
    queueName: EQueueNames.processTwo,
    routingKey: ERoutingKeys.routingTwo,
    exchangeProvider: exchangeDirectProvider,
  },
];
