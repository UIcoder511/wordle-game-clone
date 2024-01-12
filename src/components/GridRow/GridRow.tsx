import React, { FC } from "react";
import GridRowCell from "./GridRowCell/GridRowCell";
import "./GridRow.css";
import { IWordState } from "../../hooks/useWorddle";
import { animated, useSpring } from "@react-spring/web";

interface GridRowProps extends IWordState {
  wordToGuess: string;
  level: number;
}

const GridRow: FC<GridRowProps> = ({ data, wordToGuess, isFixed, level }) => {
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
  return (
    <animated.div className={"grid-row"} style={{ ...styles }}>
      {Array(level)
        .fill("")
        .map((_, index) => (
          <GridRowCell
            key={index}
            value={data[index]}
            status={
              isFixed
                ? wordToGuess.charAt(index) === data[index]
                  ? "correct"
                  : data[index] !== "" && wordToGuess.includes(data[index])
                  ? "wrong-position"
                  : data[5] !== ""
                  ? "incorrect"
                  : ""
                : ""
            }
          />
        ))}
    </animated.div>
  );
};

export default GridRow;
