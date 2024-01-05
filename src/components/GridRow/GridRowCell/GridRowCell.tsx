import React, { FC, useEffect, useLayoutEffect } from "react";
import "./GridRowCell.css";

import { useSpring, animated, to } from "@react-spring/web";

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

const GridRowCell: FC<GridRowCellProps> = ({
  value = "",
  status,
  filled = false,
  styles,
}) => {
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

  if (filled) {
    return (
      <div
        className="grid-cell-contianer"
        style={{ ...styles?.gridCellContainer }}
      >
        <div
          className={`grid-cell ${status} ${filled ? "filled" : ""}`}
          style={{ ...styles?.gridCell }}
        >
          {value}
        </div>
      </div>
    );
  }
  return (
    <div className="grid-cell-contianer">
      <animated.div
        style={{ ...stylesSpring }}
        className={`grid-cell ${status} ${filled ? "filled" : ""}`}
      >
        {value}
      </animated.div>
    </div>
  );
};

export default GridRowCell;
