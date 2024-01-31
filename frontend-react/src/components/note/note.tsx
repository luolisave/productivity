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
      <h1>
        Note ({id})
        <button className="btn btn-primary" style={{float: 'right'}}>Save Note</button>
      </h1>
      <div className="pt-2">
        <textarea className="form-control" style={{minHeight: '480px'}}></textarea>
      </div>
    </>
  );
}

export default Note;
