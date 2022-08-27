import { useAppSelector } from "../../services/store";
import { selectPosts } from "./selectors";
import { PostCard } from "./PostCard";

export const PostBoard = () => {
  const posts = useAppSelector(selectPosts);
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
