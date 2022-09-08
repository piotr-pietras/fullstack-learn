import { RequestOptions } from "http";
import { ParsedUrlQuery } from "querystring";
import { getPostsRequest } from "./posts/posts.builder";

enum RequestsList {
  posts = "posts",
}

type RequestsType = {
  [key in RequestsList]: RequestOptions & {
    buildResBody: (query: ParsedUrlQuery) => Promise<string>;
  };
};

export const Requests: RequestsType = {
  [RequestsList.posts]: getPostsRequest(),
};
