import { IncomingMessage } from "http";
import { Authorization } from "../../services/authorization";
import { AddPostRequest } from "../../../../types/post.type";
import { jsonReader } from "../../services/jsonReader";
import { insertPost, isJsonInvalid } from "./add.adapter";

const buildResBody = async (inc: IncomingMessage, auth: Authorization) => {
  const json = await jsonReader<AddPostRequest>(inc);

  try {
    const body = await isJsonInvalid(json);
    const response = await insertPost(body, auth.userId);
    return JSON.stringify(response);
  } catch (err) {
    return JSON.stringify(err);
  }
};

export const buildAddRequest = () => {
  return {
    path: "/add",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    needAuth: true,
    buildResBody,
  };
};
