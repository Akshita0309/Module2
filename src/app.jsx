import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";
import { savePosts } from "./utils/localStorage";

function App() {
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<ViewPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
