import { Route, Routes, Link, NavLink, useLocation } from "react-router-dom";

import "./App.css";

import Home from "./components/home/Home";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import Notes from "./components/notes/notes";
import Tests from "./components/tests/tests";
import Settings from "./components/settings/settings";
import NotFound from "./components/NotFound/NotFound.js";
import Note from "./components/note/note";
import List1 from "./components/tests/list1/list1";
import Test1 from "./components/tests/test1/test1";

// https://www.youtube.com/watch?v=SqcY0GlETPk
// npm create vite@4.1.0

function navActiveColor(navObj: { isActive: boolean }) {
  return navObj.isActive ? { color: "red" } : {};
}

// https://youtu.be/Ul3y1LXxzdU?si=Z8SbPKCa9BUewscc&t=980  // not found page
function App() {
  const location = useLocation(); // check NotFound.tsx
  return (
    <>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            {/* <Link style={navActiveColor} to="/"> */}
            <NavLink to="/">Home</NavLink>
          </span>
          <span className="navbar-brand">
            <NavLink to="/bookmarks">Bookmarks</NavLink>
          </span>
          <span className="navbar-brand">
            <NavLink to="/notes">Notes</NavLink>
          </span>
          <span className="navbar-brand">
            Note+
            {/* <NavLink to="/bookmarks">Bookmarks</NavLink> */}
          </span>
          <span className="navbar-brand">
            <NavLink to="/tests">Tests</NavLink>
          </span>
          <span className="navbar-brand">
            <NavLink to="/settings">Settings</NavLink>
          </span>
        </div>
      </nav>

      <div className="container-fluid">
        <div>
          <h2>{location.state}</h2>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/note/:id" element={<Note />} />
          {/* <Route path="/tests" element={<Tests />} /> */}
          <Route path="/tests" element={<Tests />}>
            <Route path="test1" element={<Test1 />} />
            <Route path="list1" element={<List1 />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
