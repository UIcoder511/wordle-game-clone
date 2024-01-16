import { SpringValue, animated, useSpring } from "@react-spring/web";
import React, { FC, useEffect } from "react";
import { styled, theme } from "stitches.config";
import Button from "ui/Button/Button";
import GridButton from "ui/GridButton/GridButton";
import MenuCard from "ui/MenuCard/MenuCard";

const Container = styled("div", {
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Text = styled("h3", {
  fontWeight: 800,
  color: "#6b37c6",
  fontSize: "0.9rem",
  margin: "10px 0px",
  textAlign: "center",
});

const Word = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

interface ResultType {
  isWon: boolean;
  word: string;
  setNextWord: () => void;
  backToHomeHandler: () => void;
}

const AnimatedMenuCard = animated(MenuCard);
const AnimatedContainer = animated(Container);

const Result: FC<ResultType> = ({
  isWon,
  word,
  setNextWord,
  backToHomeHandler,
}) => {
  const [styles, api] = useSpring(() => ({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    config: {
      tension: 150,
      friction: 10,
    },
  }));
  const springOpacity = new SpringValue(0);

  useEffect(() => {
    springOpacity.start(1);
    api.start();
  }, []);

  return (
    <AnimatedContainer style={{ opacity: springOpacity }}>
      <AnimatedMenuCard
        style={styles}
        title={isWon ? "You Won!" : `You lost!`}
        styles={{
          body: {
            width: "300px",
            // height: "180px",
            paddingLeft: "20px",
            paddingRight: "20px",
            // gap: "5px",
            display: "flex",
            flexDirection: "column",
          },
          bodyWrapper: {
            // width:
            height: "400px",
          },
          header: {
            padding: "10px 30px",
          },
        }}
      >
        <Text>The correct word is </Text>
        <Word>
          {word.split("").map((char, pos) => (
            <GridButton
              key={pos}
              // status={pos + 1 === position ? status : ""}
              styles={{
                gridCellContainer: {
                  width: "40px",
                  height: "40px",
                },
                gridCell: {
                  fontSize: "2rem",
                  borderBottomWidth: "4px",
                  borderRadius: "10px",
                  WebkitTextStroke: "1px #555",

                  backgroundColor: theme.colors.correctBg,
                  borderBottomColor: theme.colors.correctShadow,
                },
              }}
            >
              {char}
            </GridButton>
          ))}
        </Word>
        <Button
          btnType="try"
          onClick={setNextWord}
          styles={{ marginTop: "20px" }}
        >
          Next Word
        </Button>
        <Button
          btnType="try"
          onClick={backToHomeHandler}
          styles={{ marginTop: "20px" }}
        >
          Home
        </Button>
      </AnimatedMenuCard>{" "}
    </AnimatedContainer>
  );
};

export default Result;
