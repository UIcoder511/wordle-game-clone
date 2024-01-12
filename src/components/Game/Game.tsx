import GridRow from "components/GridRow/GridRow";
import { WordLevelType } from "components/Home/Home";
import Result from "components/Result/Result";
import TutorialContainer from "components/TutorialContainer/TutorialContainer";
import { IGameState } from "hooks/useWorddle";
import React from "react";
import Tutorial from "staticUI/Tutorial/Tutorial";
import { styled, theme } from "stitches.config";
import Button from "ui/Button/Button";
import GridButton from "ui/GridButton/GridButton";
import MenuCard from "ui/MenuCard/MenuCard";

interface GameType {
  gameState: Exclude<IGameState, null>;
  word: string;
  level: WordLevelType | 0;
  canEnter: boolean;
  guessTheWord: () => void;
  isGameFinished: boolean;
  isWon: boolean;
}

const Game: React.FC<GameType> = ({
  gameState,
  word,
  level,
  canEnter,
  guessTheWord,
  isGameFinished,
  isWon,
}) => {
  return (
    <>
      <TutorialContainer />
      <div className="main-container">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <GridRow
              key={index}
              data={gameState[index].data}
              isFixed={gameState[index].isFixed}
              wordToGuess={word}
              level={level}
            />
          ))}
      </div>
      <footer>
        <Button disabled={!canEnter} onClick={guessTheWord} btnType="try">
          TRY IT
        </Button>
      </footer>
      {isGameFinished && <Result isWon={isWon} word={word} />}
    </>
  );
};

export default Game;
