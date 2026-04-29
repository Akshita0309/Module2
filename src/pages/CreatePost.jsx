import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(
      addPost({
        id: Date.now(),
        ...data,
        likes: 0,
      }),
    );
    navigate("/");
  };

  return (
    <main className="page">
      <section className="panel glass">
        <h1>Create a New Post</h1>
        <p>Turn your next idea into something worth sharing.</p>
        <PostForm onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
