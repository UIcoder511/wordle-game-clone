import React, { FC } from "react";
import "./Home.css";

import Logo from "./components/Logo/Logo";
import LevelCards from "./components/LevelCards/LevelCards";

export type WordLevelType = 4 | 5 | 6;

type HomeProps = {
  setLevel: (level: WordLevelType) => void;
};

const Home: FC<HomeProps> = ({ setLevel }) => {
  return (
    <div className="homescreen">
      <Logo />
      <LevelCards onClick={(level) => setLevel(level)} />
      <footer>
        Design from Sabah Sarwar and Developed with{" "}
        <span style={{ color: "red" }}>&#10084;</span> by Umang
      </footer>
    </div>
  );
};

export default Home;
