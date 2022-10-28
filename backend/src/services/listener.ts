import { createServer } from "http";
import { recognizeRequest } from "../requests/recognizeRequest";
import { responser } from "./responser";

export const listener = (host: string, port: number) => {
  createServer((inc, out) => {
    const request = recognizeRequest(inc);
    responser(request, inc, out);
  }).listen(port, host);
};
