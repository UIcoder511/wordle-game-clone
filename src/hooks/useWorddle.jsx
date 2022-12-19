import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const initState = [
  { data: ["", "", "", "", "", ""], fixed: false },
  { data: ["", "A", "", "", "", ""], fixed: false },
  { data: ["M", "", "", "", "", ""], fixed: false },
  { data: ["B", "", "", "", "", ""], fixed: false },
  { data: ["A", "B", "C", "M", "S", "A"], fixed: true },
  { data: ["", "C", "", "", "", ""], fixed: false },
];

const useWorddle = () => {
  const [gameState, setGameState] = useState(initState);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  console.log(gameState);
  useEffect(() => {
    const keydownHandler = (e) => {
      console.log(e);
      if (
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)
      ) {
        console.log(e.key);
        const newState = JSON.parse(JSON.stringify(gameState));
        newState[currentRow].data[currentPosition] = e.key.toUpperCase();
        flushSync(() => {
          if (currentPosition !== 6) setCurrentPosition((prev) => prev + 1);
          setGameState(newState);
        });
      } else if (e.keyCode === 8) {
        const newState = JSON.parse(JSON.stringify(gameState));
        newState[currentRow].data[currentPosition - 1] = "";
        flushSync(() => {
          if (currentPosition !== 0) setCurrentPosition((prev) => prev - 1);
          setGameState(newState);
        });
      } else if (e.keyCode === 13) {
        if (currentPosition === 6) {
          const newState = JSON.parse(JSON.stringify(gameState));
          newState[currentRow].fixed = true;
          flushSync(() => {
            setCurrentPosition(0);
            setCurrentRow((prev) => prev + 1);
            setGameState(newState);
          });
        }
      }
    };

    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [currentPosition]);

  return {
    gameState,
  };
};

export default useWorddle;
