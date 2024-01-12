import { WordLevelType } from "components/Home/Home";
import React, { FC } from "react";
import LevelCard from "./LevelCard";

interface LevelCardsProps {
  onClick: (wordLevel: WordLevelType) => void;
}

const LevelCards: FC<LevelCardsProps> = ({ onClick }) => {
  return (
    <div className="flex">
      <LevelCard
        remainingWords={10}
        totalWords={20}
        wordLevel={4}
        color="#ff500f"
        onClick={onClick}
      />
      <LevelCard
        remainingWords={10}
        totalWords={20}
        wordLevel={5}
        color="#00a91a"
        onClick={onClick}
      />
      <LevelCard
        remainingWords={10}
        totalWords={20}
        wordLevel={6}
        color="#f338bd"
        onClick={onClick}
      />
    </div>
  );
};
export default LevelCards;
