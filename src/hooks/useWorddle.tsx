import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { WordLevelType } from "../components/Home/Home";

type IGameState=IWordState[] | null;

export interface IWordState {
  data: string[];
  isFixed: boolean;
}

type Props = {
  correctWord: string;
}

const createInitState=(wordSize:number,noOfTries=6):IGameState=>Array(noOfTries).fill({data:Array(wordSize).fill(""),isFixed:false});

// const initState = [
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
//   { data: ["", "", "", "", "", ""], isFixed: false },
// ];

const useWorddle = ({ correctWord}:Props) => {
  const [gameState, setGameState] = useState<IGameState>(null);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [level, setLevel] = useState<number>(0);
  // console.log(gameState);

  useEffect(() => {
    if(level)
      setGameState(createInitState(level));
    
  }, [level])
  
console.log(gameState)
  const handleEnter = () => {
    const newState = JSON.parse(JSON.stringify(gameState));
    newState[currentRow].isFixed = true;
    // flushSync(() => {
    setCurrentPosition(0);
    setCurrentRow((prev) => prev + 1);
    setGameState(newState);
    if (newState[currentRow].data.join("") === correctWord) {
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
    // });
  };

  const handleKeys = (key: string) => {
    // console.log(key);
    if (currentPosition !== level){
    
    const newState = JSON.parse(JSON.stringify(gameState));
    
    newState[currentRow].data[currentPosition] = key.toUpperCase();
    // flushSync(() => {
      setCurrentPosition((prev) => prev + 1);
      setGameState(newState);
  }
    // });
  };

  const handleBackslash = () => {
    if (currentPosition !== 0)
    {
      const newState = JSON.parse(JSON.stringify(gameState));
      newState[currentRow].data[currentPosition-1] = "";
    // flushSync(() => {
      setCurrentPosition((prev) => prev - 1);
      setGameState(newState);
    }
    
  };

  useEffect(() => {
    const keydownHandler = (e:KeyboardEvent ) => {

      if (
        /^[A-Za-z]$/.test(e.key)
      ) {
       
        handleKeys(e.key);
      } else if (e.keyCode === 8 || e.key==='Backspace') {
        handleBackslash();
        // });
      } else if (e.keyCode === 13 || e.key ==='Enter') {
        if (currentPosition === level) {
          handleEnter();
        }
      }
    };
    if (!isWon) document.addEventListener("keydown", keydownHandler);
    return () => {
      if (!isWon) document.removeEventListener("keydown", keydownHandler);
    };
  }, [level,gameState,currentPosition, currentRow]);

  return {
    gameState,
    currentPosition,
    handleEnter,
    exitGame,
    isWon,
    setLevel,
    level,
    canEnter:currentPosition === level
  } as const;
};

export default useWorddle;