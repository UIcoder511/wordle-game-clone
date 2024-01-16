import React from "react";
import { styled, theme } from "stitches.config";
import type * as Stitches from "@stitches/react";
import GridButton from "ui/GridButton/GridButton";

const Container = styled("div", {
  display: "flex",
  gap: "10px",
  margin: "100px 10px",
});

const Logo = () => {
  const FilledGridButton: React.FC<{
    value: string;
    styles?: React.CSSProperties | Stitches.CSS;
  }> = ({ value, styles }) => (
    <GridButton
      styles={{
        gridCell: {
          WebkitTextStroke: "2px #ffffff",
          color: "var(--gray)",
          ...styles,
        },
      }}
    >
      {value}
    </GridButton>
  );

  return (
    <Container>
      <FilledGridButton value="W" />
      <FilledGridButton value="O" />
      <FilledGridButton value="R" />
      <FilledGridButton
        value="D"
        styles={{
          color: theme.colors.incorrectShadow,
          backgroundColor: theme.colors.incorrectBg,
          borderBottomColor: theme.colors.incorrectShadow,
        }}
      />
      <FilledGridButton
        value="L"
        styles={{
          color: theme.colors.correctShadow,
          backgroundColor: theme.colors.correctBg,
          borderBottomColor: theme.colors.correctShadow,
        }}
      />
      <FilledGridButton
        value="E"
        styles={{
          color: theme.colors.wrongPositonShadow,
          backgroundColor: theme.colors.wrongPositonBg,
          borderBottomColor: theme.colors.wrongPositonShadow,
        }}
      />
    </Container>
  );
};

export default Logo;
