import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar glass">
      <div className="brand">
        <div className="brand-mark">B</div>
        <div className="brand-copy">
          <h1>Blog Forge</h1>
          <p>Write what makes you feel alive</p>
        </div>
      </div>

      <nav className="topbar-nav">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>
    </header>
  );
}
