import { IncomingMessage } from "http";
import url from "url";
import { Requests } from "./requests";

export const recognizeRequest = (req: IncomingMessage) => {
  const path = url.parse(req.url || "", true).pathname;
  const method = req.method;
  const values = Object.values(Requests);
  const request = values.find((option) => {
    //Pre-flight
    if (!option.path && option.method === method) {
      return true;
    }
    if (option.path === path && option.method === method) {
      return true;
    }
  });

  return request;
};
