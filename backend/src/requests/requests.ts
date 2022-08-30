import { RequestOptions } from "http";

enum RequestsList {
  test = "test",
}

type RequestsType = { [key in RequestsList]: RequestOptions };

export const Requests: RequestsType = {
  [RequestsList.test]: {
    path: "/test",
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  },
};
