import { Link } from "react-router-dom";

function Home() {
  let items = ["New York", "Tokyo", "Londo", "Paris", "Hongkong"];

  return (
    <>
      <h1>Home</h1>

      <div>
        <h3>Bookmarks:</h3>
        <p>
          <Link to="/bookmarks/react">React 18+</Link>
        </p>
        <p>
          <Link to="/bookmarks/ng">Angular 17+</Link>
        </p>
      </div>

      <div>
        <h3>notes:</h3>
        <p>
          <Link to="/note/123">Note 123</Link>
        </p>
        <p>
          <Link to="/note/123?n=abc">Note 123, search abc</Link>
        </p>
      </div>
    </>
  );
}

export default Home;
