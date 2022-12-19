import React, { useEffect, useState } from "react";

const initState = [
  ["", "", "", "", "", ""],
  ["", "A", "", "", "", ""],
  ["M", "", "", "", "", ""],
  ["B", "", "", "", "", ""],
  ["A", "B", "C", "M", "S", "A"],
  ["", "C", "", "", "", ""],
];

const useWorddle = () => {
  const [gameState, setGameState] = useState(initState);

  useEffect(() => {
    return () => {};
  }, []);

  return {
    gameState,
  };
};

export default useWorddle;
