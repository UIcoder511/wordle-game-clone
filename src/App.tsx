import React from "react";

import "./App.css";
import GridRow from "./components/GridRow/GridRow";
import useWorddle from "./hooks/useWorddle";
import Home from "./components/Home/Home";
import Button from "./ui/Button/Button";
import MenuCard from "ui/MenuCard/MenuCard";
import Tutorial from "staticUI/Tutorial/Tutorial";

const CORRECT_WORD = "MIKASA"; // :)

function App() {
  const {
    level,
    setLevel,
    gameState,
    currentPosition,
    handleEnter: guessTheWord,
    isWon,
    canEnter,
  } = useWorddle({ correctWord: CORRECT_WORD });

  return (
    <div className="App">
      <Tutorial />
      {/* {
      // !isStarted ?<Home setIsStarted={setIsStarted}  />:
      !gameState ?<Home setLevel={setLevel}  />:
      <>
       <div className="main-container">
       {Array(6)
          .fill("")
          .map((_, index) => (
            <GridRow
              key={index}
              data={gameState?.[index].data}
              isFixed={gameState?.[index].isFixed}
              wordToGuess={CORRECT_WORD}
              level={level}
            />
          ))}
        
      
      </div>
      <footer>
        <Button
          disabled={!canEnter}
          onClick={guessTheWord}
          btnType="try"
        >
          TRY IT
        </Button>
      </footer>
   
      </>
} */}
    </div>
  );
}

export default App;
