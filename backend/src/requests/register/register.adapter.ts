import { postgres } from "../../..";
import { RegisterRequest } from "../../../../types/register.type";
import { User } from "../../../../types/user.type";
import { getRandomToken } from "../../helpers/token";

export const isJsonInvalid = async (json: RegisterRequest | undefined) => {
  if (json && json.username) return Promise.resolve(json);
  throw {
    isSuccessful: false,
    reason: "Json syntex error",
  };
};

export const isUserExists = async (username: string) => {
  const { rows } = await postgres.query<User>(
    `SELECT users FROM users WHERE username='${username}'`
  );
  if (rows.length === 0) return Promise.resolve();
  throw {
    isSuccessful: false,
    reason: "Username already exists",
  };
};

export const insertUser = async (username: string) => {
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
