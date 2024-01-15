import { useEffect } from "react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { state: "Error: no such page." });
    }, 1000);
  }, []);
  return (
    <>
      <h1>Page NotFound</h1>
    </>
  );
}

export default NotFound;
