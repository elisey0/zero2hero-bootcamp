import { useEffect, useState } from "react";

function DependentEffect() {
  const names = ["Pasha", "Tanya", "Artem", "Laura", "Alexander"];

  const [recommendations, setRecommendations] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText.length == 0) {
      setRecommendations([]);
    } else if (searchText.length > 0) {
      const newRecs = names.filter((name) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      setRecommendations(newRecs);
    }
  }, [searchText]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <h3>Recs:</h3>
      {recommendations.map((rec, index) => (
        <li key={index}>{rec}</li>
      ))}
    </div>
  );
}

export default DependentEffect;
