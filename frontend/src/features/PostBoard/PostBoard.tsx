import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectPosts } from "./selectors";
import { PostCard } from "./PostCard";
import { useEffect } from "react";
import { PostBoardActions } from "./post-board.store";
import { env } from "../../services/env";
import { selectChosenCategory } from "../../app.slice";

export const PostBoard = () => {
  const dispatch = useAppDispatch();
  const { dataFetched } = PostBoardActions;

  const posts = useAppSelector(selectPosts);
  const category = useAppSelector(selectChosenCategory);

  useEffect(() => {
    if (category)
      dispatch(
        dataFetched({
          method: "POST",
          url: `${env.backendURL}posts?quantity=20&type=${category}`,
        })
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div>
      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};
