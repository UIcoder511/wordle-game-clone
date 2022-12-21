import React from "react";

import "./App.css";
import GridRow from "./components/GridRow/GridRow";
import useWorddle from "./hooks/useWorddle";

const COREECT_WORD = "MIKASA"; // :)

function App() {
  const {
    gameState,
    currentPosition,
    handleEnter: guessTheWord,
    isWon,
  } = useWorddle({ correctWord: COREECT_WORD });
  return (
    <div className="App">
      {/* <header>
        <div>Worddle Game</div>
        <div>Guess the anime character :)</div>
      </header> */}
      <div className="main-container">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <GridRow
              key={index}
              data={gameState[index].data}
              isFixed={gameState[index].fixed}
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
      <footer>
        <button
          disabled={currentPosition !== 6}
          onClick={guessTheWord}
          className="submit-btn"
        >
          TRY IT
        </button>
      </footer>
    </div>
  );
}

export default App;
