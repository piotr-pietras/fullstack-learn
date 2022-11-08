import { IncomingMessage, ServerResponse } from "http";
import { pause } from "../helpers/pause";
import { recognizeRequest } from "../requests/recognizeRequest";
import { authorization } from "./authorization";

export const responser = async (
  req: ReturnType<typeof recognizeRequest>,
  inc: IncomingMessage,
  out: ServerResponse
) => {
  //Imitates not localhost
  await pause(500);

  if (!req) {
    out.writeHead(404, "ERR");
    out.end();
  }

  try {
    const auth = await authorization(req, inc);
    out.writeHead(200, "OK", req?.headers);
    out.end(await req?.buildResBody(inc, auth));
  } catch (error) {
    out.writeHead(401, "AUTH ERR");
    out.end();
  }
};
