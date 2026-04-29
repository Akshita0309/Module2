import { useState } from "react";

const categoryOptions = [
  "General",
  "Technology",
  "Travel",
  "Lifestyle",
  "Food",
  "Education",
];

export default function PostForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || "General");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="field">
        <label htmlFor="title">Post title</label>
        <input
          id="title"
          placeholder="Give your post a memorable title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="content">Post content</label>
        <textarea
          id="content"
          placeholder="Share your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button className="btn btn-primary" type="submit">
          Publish
        </button>
      </div>
    </form>
  );
}
