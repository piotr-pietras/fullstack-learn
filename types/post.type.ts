export interface Post {
  id: string;
  type: "all" | "sport" | "fun" | "news";
  created_on: string;
  title: string;
  content: string;
}

export interface GetPostResponse extends Post {}

export interface AddPostRequest
  extends Pick<Post, "title" | "content" | "type"> {}

export interface AddPostResponse {
  isSuccessful: boolean;
  reason: string;
}
