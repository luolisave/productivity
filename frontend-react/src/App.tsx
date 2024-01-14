import { Route, Routes, Link } from "react-router-dom";

import "./App.css";

import Home from "./components/home/Home";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import Notes from "./components/notes/notes";
import Tests from "./components/tests/tests";
import Settings from "./components/settings/settings";

// https://www.youtube.com/watch?v=SqcY0GlETPk
// npm create vite@4.1.0

// https://youtu.be/Ul3y1LXxzdU?si=Z8SbPKCa9BUewscc&t=980  // not found page
function App() {
  return (
    <>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <Link to="/">Home</Link>
          </span>
          <span className="navbar-brand">
            <Link to="/bookmarks">Bookmarks</Link>
          </span>
          <span className="navbar-brand">
            <Link to="/notes">Notes</Link>
          </span>
          <span className="navbar-brand">
            Note+
            {/* <Link to="/bookmarks">Bookmarks</Link> */}
          </span>
          <span className="navbar-brand">
            <Link to="/tests">Tests</Link>
          </span>
          <span className="navbar-brand">
            <Link to="/settings">Settings</Link>
          </span>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/note/:id" element={<Notes />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
