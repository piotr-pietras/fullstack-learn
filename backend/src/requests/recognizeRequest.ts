import { IncomingMessage } from "http";
import url from "url";
import { Requests } from "./requests";

export const recognizeRequest = (req: IncomingMessage) => {
  const path = url.parse(req.url || "", true).pathname;
  const method = req.method;
  const values = Object.values(Requests);
  const request = values.find(
    (option) => option.path === path && option.method === method
  );

  return request;
};
