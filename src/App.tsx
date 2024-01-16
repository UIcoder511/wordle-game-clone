import React, { useEffect } from "react";

import "./App.css";

import useWorddle from "./hooks/useWorddle";
import Home, { WordLevelType } from "./components/Home/Home";

import words from "./data/words.json";
import Game from "components/Game/Game";
import { dataType } from "data/data";
import Credits from "staticUI/Credits/Credits";
import { styled } from "stitches.config";

const getLastWordIndexFromLocalStorage = (level: WordLevelType) => {
  const data = localStorage.getItem("data");
  if (data) {
    const object = JSON.parse(data);
    if (object[level]) {
      return object[level][object[level].length - 1];
    }
  }
  return -1;
};

export const getTotalWordsAndfnishedWordsSize = (level: WordLevelType) => {
  const data = localStorage.getItem("data");
  let finshedSize = 0;
  if (data) {
    const object = JSON.parse(data);
    if (object[level]) {
      finshedSize = object[level].length;
    }
  }
  return { totalWords: words[level].length, finshedSize };
};

const storeFinishedWordsToLocalStorage = (
  level: WordLevelType,
  wordIndex: number
) => {
  const data = localStorage.getItem("data");
  console.log(data ? data[level] : "");
  let object;
  if (data) {
    object = JSON.parse(data);
    if (object[level]) {
      object[level].push(wordIndex);
    } else {
      object = { ...object, [level]: [wordIndex] };
    }
  } else {
    object = { [level]: [wordIndex] };
  }
  localStorage.setItem("data", JSON.stringify(object));
};

const findNextWordIndex = (
  words: dataType,
  level: WordLevelType,
  lastWordIndex: number
) => {
  if (lastWordIndex === -1) {
    lastWordIndex = getLastWordIndexFromLocalStorage(level);
  }
  if (words[level].length - 1 !== lastWordIndex) return lastWordIndex + 1;
  else return -1;
};

const Container = styled("div", {
  zIndex: 2,
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  background:
    "linear-gradient(180deg, rgba(143,75,222,1) 0%, rgba(225,171,203,1) 50%, rgba(137,163,237,1) 100%)",
});

function App() {
  const {
    word,
    setWordIndex,
    wordIndex,
    level,
    setLevel,
    gameState,
    currentPosition,
    guessTheWord,
    isWon,
    canEnter,
    isGameFinished,
    startNextGame,
    exitGame,
  } = useWorddle();

  const setNextWord = (level: WordLevelType) => {
    const nextWordIndex = findNextWordIndex(words, level, wordIndex);
    if (nextWordIndex !== -1) setWordIndex(nextWordIndex);
  };

  useEffect(() => {
    if (level !== 0 && isGameFinished) {
      storeFinishedWordsToLocalStorage(level, wordIndex);
    }
  }, [wordIndex, level, isGameFinished]);

  return (
    <Container>
      {!gameState || level === 0 ? (
        <Home
          setLevel={(level) => {
            setLevel(level);
            setNextWord(level);
          }}
        />
      ) : (
        <Game
          gameState={gameState}
          level={level}
          word={word}
          canEnter={canEnter}
          guessTheWord={guessTheWord}
          isGameFinished={isGameFinished}
          isWon={isWon}
          setNextWord={(level) => {
            setNextWord(level);
            startNextGame();
          }}
          backToHomeHandler={exitGame}
        />
      )}
      <Credits />
    </Container>
  );
}

export default App;
