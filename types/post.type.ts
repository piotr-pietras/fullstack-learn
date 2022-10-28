export interface Post {
  id: string;
  type: "all" | "sport" | "fun" | "news";
  created_on: string;
  title: string;
  content: string;
}

export interface PostsResponse extends Post {}
