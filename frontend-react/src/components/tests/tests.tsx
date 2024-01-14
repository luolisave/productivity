import { Link, NavLink, Outlet } from "react-router-dom";
import "./tests.css";

function Tests() {
  return (
    <>
      <h1>Tests</h1>

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
    </>
  );
}

export default Tests;
