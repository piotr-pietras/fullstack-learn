import { ParsedUrlQuery } from "querystring";
import { postgres } from "../../../index";

interface PostsQuery {
  quantity?: "quantity";
}

const buildResBody = async (query: unknown) => {
  const q = query as PostsQuery;
  const quantity = q?.quantity && `LIMIT ${q?.quantity}`;
  
  const result = await postgres.query(
    `SELECT * FROM posts ORDER BY created_on DESC ${quantity}`
  );
  return JSON.stringify(result.rows);
};

export const getPostsRequest = () => {
  return {
    path: "/posts",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    buildResBody,
  };
};
