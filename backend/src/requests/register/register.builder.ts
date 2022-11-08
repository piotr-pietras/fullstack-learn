import { IncomingMessage } from "http";
import { RegisterRequest } from "../../../../types/register.type";
import { jsonReader } from "../../services/jsonReader";
import { insertUser, isJsonInvalid, isUserExists } from "./register.adapter";

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
