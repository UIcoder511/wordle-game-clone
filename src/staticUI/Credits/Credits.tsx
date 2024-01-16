import React from "react";
import { styled } from "stitches.config";
import behanceLogo from "assets/images/behance.png";
import githubLogo from "assets/images/github.png";

const URLs = {
  github: "https://github.com/UIcoder511/wordle-game-clone",
  behance:
    "https://www.behance.net/gallery/138525503/Wordle?tracking_source=search_projects%7Cwordle+game",
};

const CreditsContainer = styled("div", {
  backgroundColor: "#fff",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
  padding: "3px",
  fontWeight: 600,
  // heights: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8em",
});

const Logo = styled("img", {
  width: "20px",
  height: "20px",
  margin: "0px 5px",
  "&:hover": {
    opacity: 0.7,
    cursor: "pointer",
  },
});

const Credits = () => {
  return (
    <CreditsContainer>
      Developed with{" "}
      <span style={{ color: "red", margin: "0px 3px" }}>&#10084;</span> by Umang
      <a target="_blank" href={URLs.github} style={{ display: "flex" }}>
        <Logo src={githubLogo} />
      </a>
      ( Design from Sabah Sarwar{" "}
      <a target="_blank" href={URLs.behance} style={{ display: "flex" }}>
        <Logo src={behanceLogo} />
      </a>{" "}
      )
    </CreditsContainer>
  );
};

export default Credits;
