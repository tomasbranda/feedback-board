import DashboardPost from "./DashboardPost";

interface Post {
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
}

const PostList = async ({
  posts,
  tagParam,
}: {
  posts: Post[];
  tagParam: string;
}) => {
  const isParam = tagParam !== "";
  const filteredPosts = isParam
    ? posts.filter(
        (post) => post.status === null && post.tag?.name === tagParam
      )
    : posts.filter((post) => post.status === null);

  return (
    <>
      {filteredPosts.length === 0 && (
        <p className="bg-white rounded-md p-4 text-slate-600 mt-4 text-xl">
          No posts found. Make a new one!
        </p>
      )}
      {filteredPosts.map((post) => (
        <DashboardPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
