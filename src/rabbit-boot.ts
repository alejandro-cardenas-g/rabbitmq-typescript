import "./config";
import { amqpServerConfig } from "./config/amqpServer.config";
import { processTwoConsumer, processOneConsumer } from "./consumers";
import { AmqpServer } from "./servers/amqp.server";

const server = new AmqpServer(amqpServerConfig);

server.init(() => {
  console.log("AmqpServer listening");
});

server.addConsumer(processOneConsumer);
server.addConsumer(processTwoConsumer);
