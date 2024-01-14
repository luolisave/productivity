import { Link, Outlet } from "react-router-dom";
import "./test.css";

function Tests() {
  return (
    <>
      <h1>Tests</h1>

      <ul>
        <li>
          <Link to="/tests/test1">Test 1</Link>
        </li>
        <li>
          <Link to="/tests/list1">List 1</Link>
        </li>
      </ul>

      <div className="test-outlet">
        <Outlet
          context={{ hello: "my route context data for inner componments." }}
        />
      </div>
    </>
  );
}

export default Tests;
