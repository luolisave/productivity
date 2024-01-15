import { Link } from "react-router-dom";

function Notes() {
  return (
    <>
      <h1>Notes</h1>

      <div>
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

export default Notes;
