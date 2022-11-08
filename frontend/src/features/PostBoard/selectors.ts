import { createSelector } from "@reduxjs/toolkit";
import { Post } from "../../../../types/post.type";
import { selectPostBoard } from "./post-get.store";

export const selectPosts = createSelector(
  selectPostBoard,
  ({ request }) => request.response as Post[] | undefined
);
