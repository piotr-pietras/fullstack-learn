import { RequestOptions } from "http";
import { getPostsRequest } from "./posts/posts.builder";

enum RequestsList {
  posts = "posts",
}

type RequestsType = {
  [key in RequestsList]: RequestOptions & {
    buildResBody: () => Promise<string>;
  };
};

export const Requests: RequestsType = {
  [RequestsList.posts]: getPostsRequest(),
};
