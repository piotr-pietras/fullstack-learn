import { IncomingMessage } from "http";
import { postgres } from "../../..";
import { User, UserResponse } from "../../../../types/user.type";

const buildResBody = async (inc: IncomingMessage) => {
  const headerToken = inc.headers.authorization || "";
  const { rows } = await postgres.query<User>(
    `SELECT * FROM users WHERE token='${headerToken}'`
  );

  if (!rows[0]) return JSON.stringify({});
  const response: UserResponse = {
    username: rows[0].username,
    created_on: rows[0].created_on,
  };
  return JSON.stringify(response);
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
