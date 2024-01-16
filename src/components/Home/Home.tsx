import React, { FC } from "react";
import "./Home.css";

import Logo from "./components/Logo/Logo";
import LevelCards from "./components/LevelCards/LevelCards";
import { styled } from "stitches.config";

export type WordLevelType = 4 | 5 | 6;

type HomeProps = {
  setLevel: (level: WordLevelType) => void;
};

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const Home: FC<HomeProps> = ({ setLevel }) => {
  return (
    <Container>
      <Logo />
      <LevelCards onClick={(level) => setLevel(level)} />
    </Container>
  );
};

export default Home;
