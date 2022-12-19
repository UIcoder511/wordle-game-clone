import React from "react";
import "./GridRowCell.css";

const GridRowCell = ({ value = "", status }) => {
  return <div className={`grid-cell ${status}`}>{value}</div>;
};

export default GridRowCell;
