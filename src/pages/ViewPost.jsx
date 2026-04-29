import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ViewPost() {
  const { id } = useParams();

  const post = useSelector((s) => s.posts.posts.find((p) => p.id == id));

  if (!post) {
    return (
      <main className="page">
        <section className="panel glass not-found">
          <h1>Not found</h1>
          <p>This post does not exist or has been deleted.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <article className="panel glass">
        <span className="category-pill">{post.category || "General"}</span>
        <h1 className="post-view-title">{post.title}</h1>
        <p className="post-view-content">{post.content}</p>
      </article>
    </main>
  );
}
