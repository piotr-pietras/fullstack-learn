import { postgres } from "../../..";
import { AddPostRequest } from "../../../../types/post.type";

export const isJsonInvalid = async (json: AddPostRequest | undefined) => {
  if (json && json.content && json.title && json.type)
    return Promise.resolve(json);
  throw {
    isSuccessful: false,
    reason: "Json syntex error",
  };
};

export const insertPost = async (
  { type, title, content }: AddPostRequest,
  userId?: string
) => {
  if (!userId)
    throw {
      isSuccessful: false,
      reason: "Invalid user id",
    };

  const timestamp = new Date().toISOString();
  const { command } = await postgres.query(
    `INSERT INTO posts (type, user_id, created_on, title, content) VALUES ('${type}','${userId}','${timestamp}','${title}','${content}' )`
  );

  if (command !== "INSERT") {
    throw {
      isSuccessful: false,
      reason: "Something went wrong",
    };
  }

  return Promise.resolve({
    isSuccessful: true,
  });
};
