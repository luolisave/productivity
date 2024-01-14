import { useOutletContext } from "react-router";

function Test1() {
  const objOutletContext: { hello?: string } = useOutletContext();
  return (
    <>
      <h1>Test1</h1>

      {objOutletContext?.hello}
    </>
  );
}

export default Test1;
