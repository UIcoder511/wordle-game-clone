import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const initState = [
  { data: ["", "", "", "", "", ""], fixed: false },
  { data: ["", "", "", "", "", ""], fixed: false },
  { data: ["", "", "", "", "", ""], fixed: false },
  { data: ["", "", "", "", "", ""], fixed: false },
  { data: ["", "", "", "", "", ""], fixed: false },
  { data: ["", "", "", "", "", ""], fixed: false },
];

const useWorddle = ({ correctWord }) => {
  const [gameState, setGameState] = useState(initState);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isWon, setIsWon] = useState(false);
  // console.log(gameState);

  const handleEnter = () => {
    const newState = JSON.parse(JSON.stringify(gameState));
    newState[currentRow].fixed = true;
    // flushSync(() => {
    setCurrentPosition(0);
    setCurrentRow((prev) => prev + 1);
    setGameState(newState);
    if (newState[currentRow].data.join("") === correctWord) {
      setIsWon(true);
    }
    // });
  };

  const restartGame = () => {
    // flushSync(() => {
    setGameState(initState);
    setCurrentRow(0);
    setCurrentPosition(0);
    // });
  };

  const handleKeys = (key) => {
    // console.log(key);
    const newState = JSON.parse(JSON.stringify(gameState));
    newState[currentRow].data[currentPosition] = key.toUpperCase();
    // flushSync(() => {
    if (currentPosition !== 6) setCurrentPosition((prev) => prev + 1);
    setGameState(newState);
    // });
  };

  const handleBackslash = () => {
    const newState = JSON.parse(JSON.stringify(gameState));
    newState[currentRow].data[currentPosition - 1] = "";
    // flushSync(() => {
    if (currentPosition !== 0) setCurrentPosition((prev) => prev - 1);
    setGameState(newState);
  };

  useEffect(() => {
    const keydownHandler = (e) => {
      // console.log(e);
      if (
        /^[A-Za-z]$/.test(e.key)
        // (e.keyCode >= 65 && e.keyCode <= 90) ||
        // (e.keyCode >= 97 && e.keyCode <= 122)
      ) {
        handleKeys(e.key);
      } else if (e.keyCode === 8) {
        handleBackslash();
        // });
      } else if (e.keyCode === 13) {
        if (currentPosition === 6) {
          handleEnter();
        }
      }
    };
    if (!isWon) document.addEventListener("keydown", keydownHandler);
    return () => {
      if (!isWon) document.removeEventListener("keydown", keydownHandler);
    };
  }, [currentPosition, currentRow]);

  return {
    gameState,
    currentPosition,
    handleEnter,
    restartGame,
    isWon,
  };
};

export default useWorddle;
