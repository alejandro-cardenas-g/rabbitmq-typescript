import express from "express";
import "./config";
import { router } from "./routes/route";
import { Server } from "./servers/server";

const app = express();
const server = new Server(app);
server.config();
server.addRoute("/", router);
server.init(Number(process.env.PORT), async () => {
  console.log(`server listening at ${process.env.PORT}`);
});
