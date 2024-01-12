import React from "react";

import "./App.css";
import GridRow from "./components/GridRow/GridRow";
import useWorddle from "./hooks/useWorddle";
import Home, { WordLevelType } from "./components/Home/Home";
import Button from "./ui/Button/Button";
import MenuCard from "ui/MenuCard/MenuCard";
import Tutorial from "staticUI/Tutorial/Tutorial";

import words from "./data/words.json";
import Game from "components/Game/Game";

function App() {
  const {
    word,
    setWord,
    level,
    setLevel,
    gameState,
    currentPosition,
    guessTheWord,
    isWon,
    canEnter,
    isGameFinished,
  } = useWorddle();

  const setRandomWord = (level: WordLevelType) => {
    setWord(words[level][0].toUpperCase());
    setLevel(level);
  };

  return (
    <div className="App">
      {!gameState ? (
        <Home setLevel={setRandomWord} />
      ) : (
        <Game
          gameState={gameState}
          level={level}
          word={word}
          canEnter={canEnter}
          guessTheWord={guessTheWord}
          isGameFinished={isGameFinished}
          isWon={isWon}
        />
      )}
    </div>
  );
}

export default App;
