import { IncomingMessage } from "http";
import { postgres } from "../../..";

const buildResBody = async (inc: IncomingMessage) => {
  const headerToken = inc.headers.authorization || "";
  const { rows } = await postgres.query(
    `SELECT * FROM users WHERE token='${headerToken}'`
  );

  if (!rows[0]) return JSON.stringify({});
  return JSON.stringify(rows[0]);
};

export const buildLoginRequest = () => {
  return {
    path: "/login",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    needAuth: false,
    buildResBody,
  };
};
