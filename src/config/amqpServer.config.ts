import {
  IAmqpServerConfig,
  IExchangeOptions,
} from "../interfaces/servers/amqpServer.interface";

export const amqpServerConfig: IAmqpServerConfig = {
  protocol: process.env.AMQP_PROTOCOL || "amqp",
  hostname: process.env.AMQP_HOSTNAME || "",
  port: Number(process.env.AMQP_PORT),
  username: process.env.AMQP_USERNAME || "",
  password: process.env.AMQP_PASSWORD || "",
};

export const exchangeDirectProvider: IExchangeOptions = {
  name: process.env.EXCHANGE_APP || "",
  type: "direct",
};
