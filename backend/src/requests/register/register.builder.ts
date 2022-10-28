import { IncomingMessage } from "http";
import { postgres } from "../../..";
import {
  RegisterRequest,
  RegisterResponse,
} from "../../../../types/register.type";
import { User } from "../../../../types/user.type";
import { getRandomToken } from "../../helpers/token";
import { jsonReader } from "../../services/jsonReader";

const buildResBody = async (inc: IncomingMessage) => {
  let response: RegisterResponse | {} = {};
  const json = await jsonReader<RegisterRequest>(inc);
  if (!json || !json.username) {
    response = {
      isSuccessful: false,
      reason: "Json syntex error",
    };
    return JSON.stringify(response);
  }

  const { username } = json;
  const { rows } = await postgres.query<User>(
    `SELECT users FROM users WHERE username='${username}'`
  );

  if (rows.length > 0) {
    response = {
      isSuccessful: false,
      reason: "Username already exists",
    };
    return JSON.stringify(response);
  }
  const timestamp = new Date().toISOString();
  const token = getRandomToken();
  const { command } = await postgres.query(
    `INSERT INTO users (username, created_on, token) VALUES ('${username}','${timestamp}', '${token}')`
  );

  if (command !== "INSERT") {
    response = {
      isSuccessful: false,
      reason: "Something went wrong",
    };
    return JSON.stringify(response);
  }

  response = {
    isSuccessful: true,
    username,
    token,
  };
  return JSON.stringify(response);
};

export const buildRegisterRequest = () => {
  return {
    path: "/register",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    needAuth: false,
    buildResBody,
  };
};
