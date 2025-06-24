import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Comments = ({ postId }: { postId: number }) => {
  return (
    <div className="bg-white p-6 shadow rounded-md">
      <CommentList postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
};

export default Comments;
