import React from "react";

import "./App.css";
import GridRow from "./components/GridRow/GridRow";
import useWorddle from "./hooks/useWorddle";

export const COREECT_WORD = "MIKASA"; // :)

function App() {
  const { gameState } = useWorddle();
  return (
    <div className="App">
      <div className="main-container">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <GridRow
              key={index}
              data={gameState[index]}
              wordToGuess={COREECT_WORD}
            />
          ))}
        {/* <GridRow data={gameState[0]} />
        <GridRow />
        <GridRow />
        <GridRow />
        <GridRow />
        <GridRow /> */}
      </div>
    </div>
  );
}

export default App;
