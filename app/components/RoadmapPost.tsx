import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import CommentIcon from "./CommentIcon";

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

const RoadmapPost = ({ post, color }: { post: Post; color: string }) => {
  return (
    <li key={post.id}>
      <Link
        href={`/dashboard/post/${post.id}`}
        className="shadow rounded-md overflow-hidden bg-white block hover:shadow-lg transition-shadow">
        <div className={`h-2 ${color}`}></div>
        <div className="p-4">
          <h2 className="font-extrabold text-lg">{post.title}</h2>
          <p className="text-slate-600 mt-2">
            {post.content.length > 128
              ? post.content.slice(0, 128) + "..."
              : post.content}
          </p>

          <span className="bg-sky-100 text-blue-500 py-2 px-3 inline-block rounded-xl mt-2 font-semibold text-sm">
            {post.tag?.name}
          </span>
          <div className="flex items-center gap-4 mt-4">
            <div className="bg-sky-100 rounded-xl py-2 px-3 flex items-center gap-2 w-fit">
              <ArrowIcon />
              <span>{post.upvoteCount}</span>
            </div>
            {post.commentCount > 0 && (
              <span className="flex items-center gap-2 text-slate-600 font-semibold">
                <CommentIcon />
                {post.commentCount}
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default RoadmapPost;
