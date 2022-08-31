import { RequestOptions } from "http";
import posts from "../../mocks/posts.mock.json";

enum RequestsList {
  test = "test",
}

type RequestsType = {
  [key in RequestsList]: RequestOptions & { resBody: () => string };
};

export const Requests: RequestsType = {
  [RequestsList.test]: {
    path: "/posts",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    resBody: () => JSON.stringify(posts),
  },
};
