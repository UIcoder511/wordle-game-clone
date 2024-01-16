import { WordLevelType } from "components/Home/Home";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import LevelCard from "./LevelCard";
import { getTotalWordsAndfnishedWordsSize } from "App";

interface LevelCardsProps {
  onClick: (wordLevel: WordLevelType) => void;
}

interface LevelCardHOCProps
  extends Omit<
    ComponentProps<typeof LevelCard>,
    "remainingWords" | "totalWords" | "wordLevel"
  > {
  wordLevel: WordLevelType;
}

const LevelCardHOC = ({ wordLevel, ...props }: LevelCardHOCProps) => {
  const [sizeInfo, setSizeInfo] = useState({ totalWords: 0, finshedSize: 0 });

  useEffect(() => {
    const { totalWords, finshedSize } =
      getTotalWordsAndfnishedWordsSize(wordLevel);
    setSizeInfo({ totalWords, finshedSize });
  }, [wordLevel]);

  return (
    <LevelCard
      remainingWords={sizeInfo.finshedSize}
      totalWords={sizeInfo.totalWords}
      wordLevel={wordLevel}
      {...props}
    />
  );
};

const LevelCards: FC<LevelCardsProps> = ({ onClick }) => {
  return (
    <div className="flex">
      <LevelCardHOC wordLevel={4} color="#ff500f" onClick={onClick} />
      <LevelCardHOC wordLevel={5} color="#00a91a" onClick={onClick} />
      <LevelCardHOC wordLevel={6} color="#f338bd" onClick={onClick} />
    </div>
  );
};
export default LevelCards;
