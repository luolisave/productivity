import { useState } from "react";
import { useOutletContext } from "react-router";

function Test1() {
  const objOutletContext: { hello?: string } = useOutletContext();
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>Test1</h1>

      {objOutletContext?.hello}

      <div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
      </div>
    </>
  );
}

export default Test1;
