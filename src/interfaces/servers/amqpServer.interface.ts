import { EQueueNames, ERoutingKeys } from "../../enums/queues.enum";

export interface IAmqpServerConfig {
  protocol: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
  locale?: string;
  frameMax?: number;
  heartbeat?: number;
  vhost?: string;
}

export interface IExchangeOptions {
  name: string;
  type: "direct" | "topic" | "headers" | "fanout" | "match";
}

export interface ConsumerChannelProps {
  acknowledge: () => void;
  reject: (requeue: boolean) => void;
}

export interface IQueues {
  queueName: EQueueNames;
  routingKey: ERoutingKeys;
  exchangeProvider: IExchangeOptions;
}
