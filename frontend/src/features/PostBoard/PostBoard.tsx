import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectPosts } from "./selectors";
import { PostCard } from "./PostCard";
import { useEffect } from "react";
import { PostGetActions } from "./post-get.store";
import { selectChosenCategory } from "../../app.slice";
import { styled } from "@mui/material";
import { Backend } from "../../services/backend";

export const PostBoard = () => {
  const dispatch = useAppDispatch();
  const { dataFetched } = PostGetActions;

  const posts = useAppSelector(selectPosts);
  const category = useAppSelector(selectChosenCategory);

  useEffect(() => {
    if (category)
      dispatch(
        dataFetched(Backend.getPosts(category))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div>
      {posts && posts.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <NoPosts>There is no any posts :(</NoPosts>
      )}
    </div>
  );
};

const NoPosts = styled("div")`
  margin: 2rem;
  font-size: ${({ theme }) => theme.fontSize.XL};
  color: ${({ theme }) => theme.colors.grey};
`;
