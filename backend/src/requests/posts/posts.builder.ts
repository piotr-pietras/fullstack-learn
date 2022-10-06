import { postgres } from "../../../index";
import { Post } from "../../../../types/post.type";

interface PostsQuery {
  quantity?: "quantity";
  type?: Post["type"];
  title?: string;
}

const buildResBody = async (query: unknown) => {
  const q = query as PostsQuery;

  const quantity = (q?.quantity && `LIMIT ${q?.quantity}`) || "";
  const type = (q?.type && q.type !== "all" && `WHERE type='${q.type}'`) || "";
  const title = (q?.title && `WHERE title ~* '${q.title}'`) || "";

  const result = await postgres.query<Post>( 
    `SELECT * FROM posts ${type} ${title} ORDER BY created_on DESC ${quantity} `
  );
  return JSON.stringify(result.rows);
};

export const buildPostsRequest = () => {
  return {
    path: "/posts",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    needAuth: true,
    buildResBody,
  };
};
