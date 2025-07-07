import Link from "next/link";
import CommentIcon from "./CommentIcon";
import PostUpvotes from "./PostUpvotes";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
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

const DashboardPost = ({ post }: { post: Post }) => {
  return (
    <li
      key={post.id}
      className="p-4 shadow rounded-md overflow-hidden bg-white ">
      <Link href={`/dashboard/post/${post.id}`}>
        <div>
          <h2 className="font-extrabold text-lg">{post.title}</h2>
          <p className="text-slate-600 mt-2">
            {post.content.length > 256
              ? post.content.slice(0, 256) + "..."
              : post.content}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-4 mt-4">
        <div className="bg-sky-100 rounded-xl py-1 px-2 flex items-center gap-2 w-fit">
          <PostUpvotes postId={post.id} upvoteCount={post.upvoteCount} />
        </div>
        {post.commentCount > 0 && (
          <span className="flex items-center gap-2 text-slate-600 font-semibold">
            <CommentIcon />
            {post.commentCount}
          </span>
        )}
      </div>
      <Link
        href={{ query: { tag: post.tag?.name.toLowerCase() } }}
        className="bg-sky-100 text-blue-500 py-2 px-3 inline-block rounded-xl mt-2 font-semibold text-sm hover:opacity-80 transition-opacity">
        #{post.tag?.name}
      </Link>
      <p className="mt-4 text-slate-600 font-light">
        {post.createdAt.toLocaleDateString("en-US", {
          dateStyle: "medium",
        })}{" "}
        by {post.author?.name}
      </p>
    </li>
  );
};

export default DashboardPost;
