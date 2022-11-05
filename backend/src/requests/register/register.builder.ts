import { IncomingMessage } from "http";
import { postgres } from "../../..";
import { RegisterRequest } from "../../../../types/register.type";
import { User } from "../../../../types/user.type";
import { getRandomToken } from "../../helpers/token";
import { jsonReader } from "../../services/jsonReader";

const isJsonInvalid = async (json: RegisterRequest | undefined) => {
  if (json && json.username) return Promise.resolve(json);
  throw {
    isSuccessful: false,
    reason: "Json syntex error",
  };
};

const isUserExists = async (username: string) => {
  const { rows } = await postgres.query<User>(
    `SELECT users FROM users WHERE username='${username}'`
  );
  if (rows.length === 0) return Promise.resolve();
  throw {
    isSuccessful: false,
    reason: "Username already exists",
  };
};

const insertUser = async (username: string) => {
  const timestamp = new Date().toISOString();
  const token = getRandomToken();
  const { command } = await postgres.query(
    `INSERT INTO users (username, created_on, token) VALUES ('${username}','${timestamp}', '${token}')`
  );

  if (command !== "INSERT") {
    throw {
      isSuccessful: false,
      reason: "Something went wrong",
    };
  }

  return Promise.resolve({
    isSuccessful: true,
    username,
    token,
  });
};

const buildResBody = async (inc: IncomingMessage) => {
  const json = await jsonReader<RegisterRequest>(inc);

  try {
    const { username } = await isJsonInvalid(json);
    await isUserExists(username);
    const response = await insertUser(username);
    return JSON.stringify(response);
  } catch (err) {
    return JSON.stringify(err);
  }
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
