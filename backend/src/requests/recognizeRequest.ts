import { IncomingMessage } from "http";
import { Requests } from "./requests";

export const recognizeRequest = (req: IncomingMessage) => {
  const path = req.url;
  const method = req.method;
  const values = Object.values(Requests);
  const request = values.find(
    (option) => option.path === path && option.method === method
  );
  return request;
};
