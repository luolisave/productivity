import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

function Note() {
  const { id } = useParams();

  //  e.g. http://localhost:5173/#/note/123?n=dfddddd
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams({ n: "dfs" });
  const n = searchParams.get("n");
  console.log("n =", n);

  return (
    <>
      <h1>Note # {id}</h1>
      <p>n = {n}</p>
    </>
  );
}

export default Note;
