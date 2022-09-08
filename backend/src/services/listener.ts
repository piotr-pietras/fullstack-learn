import { createServer, ServerResponse } from "http";
import { recognizeRequest } from "../requests/recognizeRequest";
import { Requests } from "../requests/requests";

export const listener = (host: string, port: number) => {
  createServer((req, res) => {
    const request = recognizeRequest(req);
    responseTree(request, res);
  }).listen(port, host);
};

const responseTree = async (
  req: ReturnType<typeof recognizeRequest>,
  res: ServerResponse
) => {
  switch (req) {
    case Requests.posts: {
      res.writeHead(200, "OK", req.headers);
      res.end(await req.buildResBody());
      break;
    }
    default: {
      res.writeHead(404, "ERR");
      res.end();
      break;
    }
  }
};
