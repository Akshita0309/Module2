import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";
import PostForm from "../components/PostForm";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((s) => s.posts.posts.find((p) => p.id == id));

  if (!post) {
    return (
      <main className="page">
        <section className="panel glass not-found">
          <h1>Post not found</h1>
          <p>The post you are trying to edit no longer exists.</p>
        </section>
      </main>
    );
  }

  const handleSubmit = (data) => {
    dispatch(updatePost({ ...post, ...data }));
    navigate("/");
  };

  return (
    <main className="page">
      <section className="panel glass">
        <h1>Edit Post</h1>
        <p>Refine your draft and publish the updated version.</p>
        <PostForm onSubmit={handleSubmit} initialData={post} />
      </section>
    </main>
  );
}
