import { Link, NavLink, Outlet } from "react-router-dom";
import "./tests.css";

function Tests() {
  return (
    <>
      <h1>Tests</h1>

      <div style={{border: '1px solid blue'}}>
        <h2>Notes - useParams() and useSearchParams()</h2>
        <div>
          <p>
            <Link to="/note/123">Note 123</Link>
          </p>
          <p>
            <Link to="/note/123?n=abc">Note 123, search abc</Link>
          </p>
        </div>
      </div>

      <div><br /><hr /><br /></div>

      <div style={{border: '1px solid blue'}}>
        <h2>Navigation and Nested Routing</h2>
        <ul>
          <li>
            <NavLink to="/tests/test1">Test 1</NavLink>
          </li>
          <li>
            <NavLink to="/tests/list1">List 1</NavLink>
          </li>
        </ul>

        <div className="test-outlet">
          <Outlet
            context={{ hello: "my route context data for inner componments." }}
          />
        </div>

      </div>
      
    </>
  );
}

export default Tests;
