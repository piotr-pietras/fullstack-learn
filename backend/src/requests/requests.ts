import { IncomingMessage, RequestOptions } from "http";
import { Authorization } from "../services/authorization";
import { buildAddRequest } from "./add/add.builder";
import { buildLoginRequest } from "./login/login.builder";
import { buildPostsRequest } from "./posts/posts.builder";
import { buildPreFlightRequest } from "./pre-flight/pre-flight";
import { buildRegisterRequest } from "./register/register.builder";

export enum RequestsList {
  add = "add",
  posts = "posts",
  login = "login",
  register = "register",
  "pre-flight" = "pre-flight",
}

type RequestsType = {
  [key in RequestsList]: RequestOptions & {
    needAuth: boolean;
    buildResBody: (
      inc: IncomingMessage,
      auth: Authorization
    ) => Promise<string>;
  };
};

export const Requests: RequestsType = {
  [RequestsList.add]: buildAddRequest(),
  [RequestsList.posts]: buildPostsRequest(),
  [RequestsList.login]: buildLoginRequest(),
  [RequestsList.register]: buildRegisterRequest(),
  [RequestsList["pre-flight"]]: buildPreFlightRequest(),
};
