import React, { FC, useEffect, useLayoutEffect } from "react";
import "./GridRowCell.css";

import { useSpring, animated, to } from "@react-spring/web";
import GridButton from "ui/GridButton/GridButton";
import { theme } from "stitches.config";

export const statusToColor = {
  incorrect: {
    // color: theme.colors.incorrectShadow,
    backgroundColor: theme.colors.incorrectBg,
    borderBottomColor: theme.colors.incorrectShadow,
  },
  correct: {
    // color: theme.colors.correctShadow,
    backgroundColor: theme.colors.correctBg,
    borderBottomColor: theme.colors.correctShadow,
  },
  "wrong-position": {
    // color: theme.colors.wrongPositonShadow,
    backgroundColor: theme.colors.wrongPositonBg,
    borderBottomColor: theme.colors.wrongPositonShadow,
  },
};

export type GridRowCellStatus = "wrong-position" | "correct" | "incorrect" | "";

interface GridRowCellProps {
  value: string;
  filled?: boolean;
  status?: GridRowCellStatus;
  styles?: {
    gridCellContainer?: React.CSSProperties;
    gridCell?: React.CSSProperties;
  };
}

const AnimatedGridButton = animated(GridButton);

const GridRowCell: FC<GridRowCellProps> = ({ value = "", status, styles }) => {
  const [stylesSpring, api] = useSpring(() => ({
    scale: 1,
    borderBottomWidth: "3px",
    config: {
      tension: 150,
      friction: 10,
    },
  }));

  // useLayoutEffect(() => {
  //   api.start({

  //   })

  // }, [])

  useEffect(() => {
    api.start({
      scale: status === "" && value !== "" ? 1.1 : 1,
      borderBottomWidth: status === "" && value !== "" ? "8px" : "3px",
    });
  }, [status, value]);

  // useEffect(() => {

  //   api.start({
  //     scale:value!==""?1.1:1,
  //     borderBottomWidth:value!==""?'8px':"3px",

  //   })

  // }, [value])

  return (
    // <div className="grid-cell-contianer">
    //   <animated.button
    //     style={{ ...stylesSpring }}
    //     className={`grid-cell ${status}`}
    //   >
    //     {value}
    //   </animated.button>
    // </div>
    <AnimatedGridButton
      style={{ scale: stylesSpring.scale }}
      styles={{
        gridCellContainer: {
          ...styles?.gridCellContainer,
        },
        gridCell: {
          ...styles?.gridCell,
          ...(status && statusToColor[status]),
        },
      }}
      cellSpringStyles={{ borderBottomWidth: stylesSpring.borderBottomWidth }}
      isCellAnimated={true}
    >
      {/* <animated.div className={`grid-cell ${status}`}>{value}</animated.div> */}
      {value}
    </AnimatedGridButton>
  );
};

export default GridRowCell;
