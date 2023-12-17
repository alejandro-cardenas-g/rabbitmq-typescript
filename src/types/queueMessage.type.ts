export type MessageProccess1 = {
  info: boolean;
};

export type MessageProccess2 = {
  ids: number[];
};

export type QueueMessage = MessageProccess1 | MessageProccess2 | [];
