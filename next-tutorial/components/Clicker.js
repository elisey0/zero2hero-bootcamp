import { useState } from "react";

function Clicker() {
  const [number, setNumber] = useState(0);

  function increment() {
    setNumber(number + 1);
    console.log(number);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={increment}>click me</button>
    </div>
  );
}

export default Clicker;
