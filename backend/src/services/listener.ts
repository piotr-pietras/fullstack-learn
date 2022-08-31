import { createServer } from "http";
import { recognizeRequest } from "../requests/recognizeRequest";
import { Requests } from "../requests/requests";

export const listener = (host: string, port: number) => {
  createServer((req, res) => {
    const request = recognizeRequest(req);

    switch (request) {
      case Requests.test: {
        res.writeHead(200, "OK", request.headers);
        res.end(request.resBody());
        break;
      }
      default: {
        res.writeHead(404, "ERR");
        res.end();
        break;
      }
    }
  }).listen(port, host);
};
