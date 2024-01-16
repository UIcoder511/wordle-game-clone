import { useEffect, useState } from "react";

import { WordLevelType } from "components/Home/Home";
import data from "data/data";

export type IGameState = IWordState[] | null;

export interface IWordState {
  data: string[];
  isFixed: boolean;
}

// type Props = {
//   correctWord: string;
// };

const createInitState = (wordSize: number, noOfTries = 6): IGameState =>
  Array(noOfTries).fill({ data: Array(wordSize).fill(""), isFixed: false });

// const checkIfAWord = (gussedWord: string, level: WordLevelType) => {
//   return data[level].includes(gussedWord);
// };

// const initState = [
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
// ];

const useWorddle = () => {
  const [gameState, setGameState] = useState<IGameState>(null);
  const [wordIndex, setWordIndex] = useState<number>(-1);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [level, setLevel] = useState<WordLevelType | 0>(0);
  // console.log(gameState);

  useEffect(() => {
    if (level) setGameState(createInitState(level));
  }, [level]);

  console.log(gameState);
  const handleEnter = () => {
    const newState = JSON.parse(JSON.stringify(gameState));
    newState[currentRow].isFixed = true;
    // flushSync(() => {
    setCurrentPosition(0);
    setCurrentRow((prev) => prev + 1);
    setGameState(newState);
    if (
      level !== 0 &&
      newState[currentRow].data.join("") ===
        data[level][wordIndex].toUpperCase()
    ) {
      setIsWon(true);
    }
    // });
  };

  // const setLevel = (level:WordLevelType) => {
  //   setGameState(createInitState(level));
  // }

  const exitGame = () => {
    // flushSync(() => {
    setGameState(null);
    setCurrentRow(0);
    setCurrentPosition(0);
    setLevel(0);
    setIsWon(false);
    setWordIndex(-1);
    // });
  };

  const startNextGame = () => {
    setGameState(createInitState(level));
    setCurrentRow(0);
    setCurrentPosition(0);
    setIsWon(false);
  };

  const handleKeys = (key: string) => {
    // console.log(key);
    if (currentPosition !== level) {
      const newState = JSON.parse(JSON.stringify(gameState));

      newState[currentRow].data[currentPosition] = key.toUpperCase();
      // flushSync(() => {
      setCurrentPosition((prev) => prev + 1);
      setGameState(newState);
    }
    // });
  };

  const handleBackslash = () => {
    if (currentPosition !== 0) {
      const newState = JSON.parse(JSON.stringify(gameState));
      newState[currentRow].data[currentPosition - 1] = "";
      // flushSync(() => {
      setCurrentPosition((prev) => prev - 1);
      setGameState(newState);
    }
  };

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (/^[A-Za-z]$/.test(e.key)) {
        handleKeys(e.key);
      } else if (e.keyCode === 8 || e.key === "Backspace") {
        handleBackslash();
        // });
      } else if (e.keyCode === 13 || e.key === "Enter") {
        if (currentPosition === level) {
          handleEnter();
        }
      }
    };
    if (!isWon) document.addEventListener("keydown", keydownHandler);
    return () => {
      if (!isWon) document.removeEventListener("keydown", keydownHandler);
    };
    // eslint-disable-next-line
  }, [level, gameState, currentPosition, currentRow]);

  return {
    word: level !== 0 ? data[level][wordIndex].toUpperCase() : "",
    wordIndex,
    setWordIndex,
    gameState,
    currentPosition,
    guessTheWord: handleEnter,
    exitGame,
    isWon,
    setLevel,
    level,
    canEnter: currentPosition === level,
    isGameFinished: isWon || (currentRow === 6 && currentPosition === 0),
    startNextGame,
  } as const;
};

export default useWorddle;
