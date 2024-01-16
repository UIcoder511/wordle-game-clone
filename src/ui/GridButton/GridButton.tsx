import React, { ButtonHTMLAttributes } from "react";
import { styled } from "stitches.config";
import type * as Stitches from "@stitches/react";
import { CSS, SpringValues, animated } from "@react-spring/web";

type GridButtonProps = {
  children?: React.ReactNode;
  styles?: {
    gridCellContainer?: React.CSSProperties | Stitches.CSS;
    gridCell?: React.CSSProperties | Stitches.CSS;
  };
  isCellAnimated?: boolean;
  cellSpringStyles?: typeof CSS;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const GridCellContainer = styled("button", {
  height: "var(--cell-size)",
  width: "var(--cell-size)",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  "&[disabled]": {},
});

const GridCell = styled("div", {
  borderRadius: "20px",
  height: "100%",
  width: "100%",
  backgroundColor: "var(--imcomplete-bg)",
  boxShadow: "var(--cell-shadow)",
  borderBottomWidth: "8px",
  borderBottomStyle: "solid",
  borderBottomColor: "var(--imcomplete-shadow)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "4rem",
  fontWeight: 800,
  WebkitTextStroke: "2px #555",
  color: "#fff",
  transformOrigin: "bottom",
});

const AnimatedCell = animated(GridCell);

const GridButton: React.FC<GridButtonProps> = ({
  children,
  styles,
  isCellAnimated = false,
  cellSpringStyles,
  ...restProps
}) => {
  return (
    <GridCellContainer
      css={{ ...styles?.gridCellContainer }}
      disabled={restProps.disabled || !restProps.onClick}
      {...restProps}
    >
      {isCellAnimated ? (
        <AnimatedCell
          style={{ ...cellSpringStyles }}
          css={{ ...styles?.gridCell }}
        >
          {children}{" "}
        </AnimatedCell>
      ) : (
        <GridCell css={{ ...styles?.gridCell }}>{children}</GridCell>
      )}
    </GridCellContainer>
  );
};

export default GridButton;
