import { AddPostRequest } from "../../../types/post.type";
import { Category } from "../app.slice";
import { env } from "./env";

const backend = env.backendURL;

export class Backend {
  static getPosts(type: keyof typeof Category) {
    return {
      method: "POST",
      url: `${backend}posts?quantity=20&type=${type}`,
      auth: false,
    };
  }

  static getPostsByTitle(title: string) {
    return {
      method: "POST",
      url: `${backend}posts?quantity=20&title=${title}`,
      auth: false,
    };
  }

  static getLogin() {
    return {
      method: "GET",
      url: `${backend}login`,
      auth: true,
    };
  }

  static postRegister(username: string) {
    return {
      method: "POST",
      url: `${backend}register`,
      auth: false,
      body: JSON.stringify({ username }),
    };
  }

  static postAddPost(body: AddPostRequest) {
    return {
      method: "POST",
      url: `${backend}add`,
      auth: false,
      body: JSON.stringify(body),
    };
  }
}
