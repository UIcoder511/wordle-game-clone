import { WordLevelType } from "components/Home/Home";
import React, { FC } from "react";

interface LevelCardProps {
  remainingWords: number;
  totalWords: number;
  wordLevel: WordLevelType;
  color: "#ff500f" | "#00a91a" | "#f338bd"; //hex
  onClick: (wordLevel: WordLevelType) => void;
}

const LevelCard: FC<LevelCardProps> = ({
  remainingWords,
  totalWords,
  wordLevel,
  color,
  onClick,
}) => {
  return (
    <div
      className="level-card word-font"
      onClick={() => onClick(wordLevel)}
      style={{
        borderTop: "6px solid " + color,
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, " + color + " 40%)",
      }}
    >
      <span
        className="top-design-card"
        style={{
          backgroundColor: color,
        }}
      >
        {/* <span className='left-corner'></span>  */}
      </span>
      <span
        className="number"
        style={{ color: color, WebkitTextStroke: "1px #fff" }}
      >
        {wordLevel}
      </span>
      <div style={{ color: "#fff", WebkitTextStroke: "1px " + color }}>
        Words
      </div>
      <div style={{ color: "#fff", WebkitTextStroke: "1px " + color }}>
        <span className="reaming-word">{remainingWords}</span>
        <span>/</span>
        <span className="total-word">{totalWords}</span>
      </div>
    </div>
  );
};

export default LevelCard;
