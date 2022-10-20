import { createServer, IncomingMessage, ServerResponse } from "http";
import { pause } from "../helpers/pause";
import { recognizeRequest } from "../requests/recognizeRequest";
import { Requests } from "../requests/requests";
import { authorization } from "./authorization";

export const listener = (host: string, port: number) => {
  createServer((inc, out) => {
    const request = recognizeRequest(inc);

    responseTree(request, inc, out);
  }).listen(port, host);
};

const responseTree = async (
  req: ReturnType<typeof recognizeRequest>,
  inc: IncomingMessage,
  out: ServerResponse
) => {
  //Imitates not localhost
  await pause(500);
  console.log("Incoming...");
  try {
    // console.log(inc.method);
    // console.log(req);
    const auth = await authorization(req, inc);

    switch (req) {
      case Requests.posts: {
        out.writeHead(200, "OK", req.headers);
        out.end(await req.buildResBody(inc));
        break;
      }
      case Requests.login: {
        out.writeHead(200, "OK", req.headers);
        out.end(await req.buildResBody(inc));
        break;
      }
      case Requests["pre-flight"]: {
        console.log('preflight...')
        out.writeHead(200, "OK", req.headers);
        out.end();
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
