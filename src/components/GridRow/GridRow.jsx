import React from "react";
import GridRowCell from "./GridRowCell/GridRowCell";
import "./GridRow.css";

const GridRow = ({ data, wordToGuess }) => {
  return (
    <div className={"grid-row"}>
      {Array(6)
        .fill("")
        .map((_, index) => (
          <GridRowCell
            key={index}
            value={data[index]}
            status={
              wordToGuess.charAt(index) === data[index]
                ? "correct"
                : data[index] !== "" && wordToGuess.includes(data[index])
                ? "wrong-position"
                : data[5] !== ""
                ? "imcorrect"
                : ""
            }
          />
        ))}
      {/* <GridRowCell value="A" status={"correct"} />
      <GridRowCell value="D" status={"wrong-position"} />
      <GridRowCell />
      <GridRowCell />
      <GridRowCell /> */}
    </div>
  );
};

export default GridRow;
