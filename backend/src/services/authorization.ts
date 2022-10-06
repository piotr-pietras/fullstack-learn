import { IncomingMessage } from "http";
import { postgres } from "../..";
import { recognizeRequest } from "../requests/recognizeRequest";

export const authorization = async (
  req: ReturnType<typeof recognizeRequest>,
  inc: IncomingMessage
): Promise<{ userId?: number; allowed: boolean }> => {
  const headerToken = inc.headers.authorization || "";
  const { rows } = await postgres.query(
    `SELECT id FROM users WHERE token='${headerToken}'`
  );

  if (rows.length > 0)
    return Promise.resolve({ userId: rows[0]["id"], allowed: true });
  if (!req?.needAuth)
    return Promise.resolve({ userId: undefined, allowed: true });
  return Promise.reject("Auth failed");
};
