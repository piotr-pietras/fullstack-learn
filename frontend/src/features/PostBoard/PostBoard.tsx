import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectPosts } from "./selectors";
import { PostCard } from "./PostCard";
import { useEffect } from "react";
import { PostBoardActions } from "./post-board.store";

export const PostBoard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(PostBoardActions.dataFetched());
  }, []);

  return (
    <div>
      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};
