import { setRequestMeta } from "next/dist/server/request-meta";
import { useState } from "react";

function StateWithInput() {
  // myName is the variable
  // setMyName is the updater function
  // Create a state variable with initial value
  // being an empty string ""
  const [myName, setMyName] = useState("");

  function handleOnChange(text) {
    setMyName(text);
  }

  return (
    <div>
      <input type="text" onChange={(e) => handleOnChange(e.target.value)} />
      <p>Hello, {myName}!</p>
    </div>
  );
}

export default StateWithInput;
