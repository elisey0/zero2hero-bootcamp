import { useState } from "react";

function StateArray() {
  const [fruits, setFruits] = useState([]);
  const [currentFruit, setCurrentFruit] = useState("");

  function updateCurrentFruit(text) {
    setCurrentFruit(text);
  }

  function addFruitToArray() {
    // The spread operator `...fruits` adds all elements
    // from the `fruits` array to the `newFruits` array
    // and then we add the `currentFruit` to the array as well
    const newFruits = [...fruits, currentFruit];
    setFruits(newFruits);
  }

  return (
    <div>
      <input type="text" onChange={(e) => updateCurrentFruit(e.target.value)} />
      <button onClick={addFruitToArray}>Add Fruit</button>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default StateArray;
