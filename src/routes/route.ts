import { Router } from "express";
import { EQueueNames } from "../enums/queues.enum";
import { publisherService } from "../services/publisher.service";
import { MessageProccess1, MessageProccess2 } from "../types/queueMessage.type";

const router = Router();

router.get("/runProcessOne", async (req, res) => {
  publisherService.publishMessage<MessageProccess1>(EQueueNames.processOne, {
    info: true,
  });
  return res.status(200).json({
    status: "ok",
    message: "runProcessOne",
  });
});

router.get("/runProcessTwo", async (req, res) => {
  publisherService.publishMessage<MessageProccess2>(EQueueNames.processTwo, {
    ids: [1, 2, 3, 4, 5],
  });
  return res.status(200).json({
    status: "ok",
    message: "runProcessTwo",
  });
});

export { router };
