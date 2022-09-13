import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectPosts } from "./selectors";
import { PostCard } from "./PostCard";
import { useEffect } from "react";
import { PostBoardActions } from "./post-board.store";
import { env } from "../../services/env";
import { selectChosenCategory } from "../../app.store";

export const PostBoard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const category = useAppSelector(selectChosenCategory);

  useEffect(() => {
    dispatch(
      PostBoardActions.dataFetched({
        method: "POST",
        url: `${env.backendURL}posts?quantity=20&type=${category}`,
      },)
    );
  }, [category]);

  return (
    <div>
      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};
