import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const liked = useSelector((state) =>
    state.posts.likedPostIds.includes(post.id),
  );

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Delete this blog post? This action cannot be undone.",
    );

    if (shouldDelete) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <article className="post-card glass">
      <span className="category-pill">{post.category || "General"}</span>
      <h2>{post.title}</h2>
      <p className="post-excerpt">{post.content.slice(0, 120)}...</p>

      <div className="card-actions">
        <div className="like-wrapper">
          <button
            onClick={() => dispatch(likePost(post.id))}
            className={`btn btn-like${liked ? " liked" : ""}`}
            aria-label={liked ? "Unlike" : "Like"}
          >
            {liked ? "❤️" : "🤍"}
          </button>
          <span className="like-count">{post.likes}</span>
        </div>

        <Link to={`/post/${post.id}`} className="btn btn-primary">
          View
        </Link>

        <Link to={`/edit/${post.id}`} className="btn btn-warning">
          Edit
        </Link>

        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </article>
  );
}
