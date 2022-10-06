import { RequestOptions } from "http";
import { ParsedUrlQuery } from "querystring";
import { buildPostsRequest } from "./posts/posts.builder";

enum RequestsList {
  posts = "posts",
}

type RequestsType = {
  [key in RequestsList]: RequestOptions & {
    needAuth: boolean,
    buildResBody: (query: ParsedUrlQuery) => Promise<string>;
  };
};

export const Requests: RequestsType = {
  [RequestsList.posts]: buildPostsRequest(),
};
