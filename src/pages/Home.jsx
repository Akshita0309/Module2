import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";

export default function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      posts.map((post) => post.category || "General"),
    );
    return ["All", ...Array.from(uniqueCategories)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        (post.category || "General") === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.content.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

  return (
    <main className="page">
      <section className="stats-bar glass">
        <span>
          Total Blogs: <strong>{posts.length}</strong>
        </span>
        <span>
          Total Likes: <strong>{totalLikes}</strong>
        </span>
      </section>
      {posts.length === 0 ? (
        <section className="empty-state glass">
          <h2>No posts yet</h2>
          <p>Create your first post and it will appear here.</p>
        </section>
      ) : (
        <>
          <section className="filter-panel glass">
            <input
              className="search-input"
              type="search"
              placeholder="Search in title or content"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? "btn btn-theme filter-chip active"
                      : "btn btn-theme filter-chip"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {filteredPosts.length === 0 ? (
            <section className="empty-state glass">
              <h2>No matching posts</h2>
              <p>Try another category or a broader search keyword.</p>
            </section>
          ) : (
            <section className="post-grid">
              {filteredPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}
