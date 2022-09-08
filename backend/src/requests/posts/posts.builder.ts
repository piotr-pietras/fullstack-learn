import { postgres } from "../../../index";
import { QueryResult } from "pg";

const buildResBody = async () => {
  const result = await postgres.query(
    "SELECT * FROM posts ORDER_BY created_on DESC"
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
