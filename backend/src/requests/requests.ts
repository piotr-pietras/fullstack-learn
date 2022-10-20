import { IncomingMessage, RequestOptions } from "http";
import { buildLoginRequest } from "./login/login.builder";
import { buildPostsRequest } from "./posts/posts.builder";
import { buildPreFlightRequest } from "./pre-flight/pre-flight";

export enum RequestsList {
  posts = "posts",
  login = "login",
  "pre-flight" = "pre-flight",
}

type RequestsType = {
  [key in RequestsList]: RequestOptions & {
    needAuth: boolean;
    buildResBody: (inc: IncomingMessage) => Promise<string>;
  };
};

export const Requests: RequestsType = {
  [RequestsList.posts]: buildPostsRequest(),
  [RequestsList.login]: buildLoginRequest(),
  [RequestsList["pre-flight"]]: buildPreFlightRequest(),
};
