import { animated, useSpring } from "@react-spring/web";
import GridRowCell, {
  GridRowCellStatus,
  statusToColor,
} from "components/GridRow/GridRowCell/GridRowCell";
import React, { useRef } from "react";
import { styled, theme } from "stitches.config";
import GridButton from "ui/GridButton/GridButton";
import MenuCard from "ui/MenuCard/MenuCard";

const AnimatedMenuCard = animated(MenuCard);

interface TUTORIAL_DATA_TYPE {
  [key: string]: {
    position: number;
    status: GridRowCellStatus;
    text: string;
  };
}

const HEADING_TEXT =
  "After each guess, the color of tiles will change to show how close your guess was to the word";

const TUTORIAL_DATA: TUTORIAL_DATA_TYPE = {
  WEARY: {
    position: 1,
    status: "correct",
    text: "The letter 'W' is in the word and in the correct spot.",
  },
  PILOT: {
    position: 4,
    status: "wrong-position",
    text: "The letter 'O' is in the word and in the wrong spot.",
  },
  VAGUE: {
    position: 3,
    status: "incorrect",
    text: "The letter 'G' is not in the word in any spot.",
  },
};

const Tutorial = () => {
  const [styles] = useSpring(() => ({
    from: {
      scale: 0.8,
    },
    to: {
      scale: 1,
    },
    config: {
      tension: 150,
      friction: 10,
    },
  }));

  const P = styled("p", {
    fontSize: "1rem",
    fontWeight: 800,
    color: "#2e50c4",
    margin: "10px 0px 40px",
    textAlign: "center",
    lineHeight: "1.2",
  });

  return (
    <AnimatedMenuCard
      title="Tutorial"
      styles={{
        bodyWrapper: {
          maxWidth: "420px",
          height: "60vh",
        },
        body: {
          padding: "40px 20px 20px",
        },
        container: {
          // minWidth: "50%",
        },
      }}
      style={{ ...styles }}
    >
      <P>{HEADING_TEXT}</P>
      {Object.keys(TUTORIAL_DATA).map((word: string) => {
        const { position, status, text } = TUTORIAL_DATA[word];
        return tutorialSection(word, position, status, text);
      })}
    </AnimatedMenuCard>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px 0px",
});

const Word = styled("div", {
  display: "flex",
  gap: "10px",
});

const Text = styled("h3", {
  fontWeight: 800,
  color: "#6b37c6",
  fontSize: "0.9rem",
});

const tutorialSection = (
  word: string,
  position: number,
  status: GridRowCellStatus,
  text: string
) => {
  return (
    <Container>
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

                ...(status && pos + 1 === position && statusToColor[status]),
              },
            }}
          >
            {char}
          </GridButton>
        ))}
      </Word>

      <Text>{text}</Text>
    </Container>
  );
};

export default Tutorial;
