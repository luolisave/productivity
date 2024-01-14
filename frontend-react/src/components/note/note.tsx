import { useParams } from "react-router";

function Note() {
  const { id } = useParams();
  return (
    <>
      <h1>Note # {id}</h1>
    </>
  );
}

export default Note;
