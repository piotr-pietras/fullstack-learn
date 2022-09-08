import { createSelector } from "@reduxjs/toolkit";
import { Post } from "../../../../types/post.type";
import { selectPostBoard } from "./post-board.store";

export const selectPosts = createSelector(
  selectPostBoard,
  ({ request }) => request.response as Post[] | undefined
);
