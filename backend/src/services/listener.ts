import { createServer, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";
import { recognizeRequest } from "../requests/recognizeRequest";
import { Requests } from "../requests/requests";

export const listener = (host: string, port: number) => {
  createServer((req, res) => {
    const request = recognizeRequest(req);
    const query = url.parse(req.url || "", true).query;

    responseTree(request, query, res);
  }).listen(port, host);
};

const responseTree = async (
  req: ReturnType<typeof recognizeRequest>,
  query: ParsedUrlQuery,
  res: ServerResponse
) => {
  switch (req) {
    case Requests.posts: {
      res.writeHead(200, "OK", req.headers);
      res.end(await req.buildResBody(query));
      break;
    }
    default: {
      res.writeHead(404, "ERR");
      res.end();
      break;
    }
  }
};
