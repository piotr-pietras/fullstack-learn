import { createSelector } from "@reduxjs/toolkit";
import { Post } from "../../types/post.type";
import posts from "../../mocks/posts.mock.json";

export const selectPosts = createSelector(() => posts as Post[]);
