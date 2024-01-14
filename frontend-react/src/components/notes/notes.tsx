import { Link } from "react-router-dom";

function Notes() {
  return (
    <>
      <h1>Notes</h1>

      <div>
        <Link to="/note/123">Note 123</Link>
      </div>
    </>
  );
}

export default Notes;
