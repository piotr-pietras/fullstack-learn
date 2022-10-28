import { IncomingMessage } from "http";

export const jsonReader = async <T>(
  inc: IncomingMessage
): Promise<T | undefined> => {
  let body = "";
  inc.on("data", (chunk) => {
    body += chunk;
  });

  return new Promise((resolve, reject) => {
    inc.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(undefined);
      }
    });
  });
};
