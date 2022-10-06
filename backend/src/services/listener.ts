import { createServer, IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";
import { pause } from "../helpers/pause";
import { recognizeRequest } from "../requests/recognizeRequest";
import { Requests } from "../requests/requests";
import { authorization } from "./authorization";

export const listener = (host: string, port: number) => {
  createServer((inc, out) => {
    const request = recognizeRequest(inc);
    const query = url.parse(inc.url || "", true).query;

    responseTree(request, query, inc, out);
  }).listen(port, host);
};

const responseTree = async (
  req: ReturnType<typeof recognizeRequest>,
  query: ParsedUrlQuery,
  inc: IncomingMessage,
  out: ServerResponse
) => {
  //Imitates not localhost
  await pause(500);

  try {
    const auth = await authorization(req, inc);

    switch (req) {
      case Requests.posts: {
        out.writeHead(200, "OK", req.headers);
        out.end(await req.buildResBody(query));
        break;
      }
      default: {
        out.writeHead(404, "ERR");
        out.end();
        break;
      }
    }
  } catch (error) {
    out.writeHead(401, "AUTH ERR");
    out.end();
  }
};
