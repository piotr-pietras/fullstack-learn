import { User } from "./user.type";

export interface Post {
  id: string;
  creationTime: number;
  title: string;
  text: string;
  //   author: User;
  //   comments: Comment[];
}

export interface Comment {}
