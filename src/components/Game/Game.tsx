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
  level: WordLevelType;
  canEnter: boolean;
  guessTheWord: () => void;
  isGameFinished: boolean;
  isWon: boolean;
  setNextWord: (level: WordLevelType) => void;
  backToHomeHandler: () => void;
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  margin: "40px 0px",
  // gap: "var(--gap)",
  // flex: 1,
  alignItems: "center",
  // justifyContent: "center",
});

const GridContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "var(--gap)",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});

const Footer = styled("div", {
  height: "100px",
});

const Game: React.FC<GameType> = ({
  gameState,
  word,
  level,
  canEnter,
  guessTheWord,
  isGameFinished,
  isWon,
  setNextWord,
  backToHomeHandler,
}) => {
  return (
    <>
      <TutorialContainer />
      <Container>
        <GridContainer>
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
        </GridContainer>
        {/* <footer> */}
        <Footer>
          <Button disabled={!canEnter} onClick={guessTheWord} btnType="try">
            TRY IT
          </Button>
        </Footer>
      </Container>

      {/* </footer> */}
      {isGameFinished && (
        <Result
          isWon={isWon}
          word={word}
          setNextWord={() => setNextWord(level)}
          backToHomeHandler={backToHomeHandler}
        />
      )}
    </>
  );
};

export default Game;
