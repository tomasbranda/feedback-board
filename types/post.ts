export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  status: "planned" | "ongoing" | "finished" | null;
  author: {
    id: string;
    name: string;
  } | null;
  tag: {
    name: string;
  } | null;
  upvoteCount: number;
  commentCount: number;
  isUpvoted?: boolean;
}
