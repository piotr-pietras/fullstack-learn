import { User } from "./user.type";

export interface Post {
  id: string;
  type: "all" | "sport" | "fun" | "news";
  created_on: number;
  title: string;
  content: string;
  //   author: User;
  //   comments: Comment[];
}

export interface Comment {}
