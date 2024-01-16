import { WordLevelType } from "components/Home/Home";
import React, { FC } from "react";
import { styled } from "stitches.config";
import { colorShade } from "utils/utils";

interface LevelCardProps {
  remainingWords: number;
  totalWords: number;
  wordLevel: WordLevelType;
  color: "#ff500f" | "#00a91a" | "#f338bd"; //hex
  onClick: (wordLevel: WordLevelType) => void;
}

const Container = styled("div", {
  margin: "10px",
  padding: "10px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: "300px",
  width: "auto",
  outline: "2px solid #fff",
  fontFamily: '"Ultra", serif',
  fontWeight: 400,
  position: "relative",
  cursor: "pointer",
});

const TopDesignCard = styled("div", {
  display: "flex",
  position: "absolute",
  width: "25%",
  height: "6px",
  top: "0px",
  backgroundColor: "#000",
  "&::before,&::after": {
    position: "absolute",
    content: '""',
    height: "8px",
    width: "8px",

    backgroundColor: "inherit",
    zIndex: 2,
    top: "-3.8px",
  },
  "&::before": {
    rotate: "45deg",
    left: "-4px",
  },
  "&::after": {
    rotate: "-45deg",
    right: "-4px",
  },
});
const Number = styled("div", {
  fontSize: "4rem",

  WebkitTextStroke: "1px #fff",
});

const LevelCard: FC<LevelCardProps> = ({
  remainingWords,
  totalWords,
  wordLevel,
  color,
  onClick,
}) => {
  return (
    <Container
      onClick={() => onClick(wordLevel)}
      style={{
        borderTop: "6px solid " + color,
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) -30%, " +
          colorShade(color, 40) +
          " 40%)",
      }}
    >
      <TopDesignCard
        style={{
          backgroundColor: color,
        }}
      >
        {/* <span className='left-corner'></span>  */}
      </TopDesignCard>
      <Number style={{ color: color }}>{wordLevel}</Number>
      <div style={{ color: "#fff", WebkitTextStroke: "1px " + color }}>
        Words
      </div>
      <div style={{ color: "#fff", WebkitTextStroke: "1px " + color }}>
        <span className="reaming-word">{remainingWords}</span>
        <span>/</span>
        <span className="total-word">{totalWords}</span>
      </div>
    </Container>
  );
};

export default LevelCard;
