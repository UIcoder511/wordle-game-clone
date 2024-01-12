import React, { ComponentProps, FC, ReactNode } from "react";
import "./Button.css";
import { styled } from "stitches.config";
import type * as Stitches from "@stitches/react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
// type ButtonProps = ComponentProps<"button">;

type Props = {
  btnType: "try" | "play" | "next";
  children: ReactNode;
  styles?: React.CSSProperties | Stitches.CSS;
} & ButtonProps;

const StyledButton = styled("button", {
  padding: "10px 20px",
  border: "none",
  borderBottom: "10px solid var(--correct-shadow)",
  backgroundColor: "var(--correct-bg)",
  boxShadow: "var(--cell-shadow)",
  borderRadius: "20px",
  fontSize: "2rem",
  fontWeight: 800,
  color: "transparent",
  WebkitTextStroke: "2px #555",
  transition: "100ms all ease-in",
  cursor: "pointer",
  "&:hover": { borderBottomWidth: "8px" },
  "&:active": { borderBottomWidth: "5px" },
  "&:disabled": {
    filter: "grayscale(1)",
    opacity: 0.6,
    cursor: "not-allowed",
    borderBottomWidth: "2px",
  },
});

const Button: FC<Props> = ({ btnType, children, styles, ...props }) => {
  return (
    <StyledButton css={{ ...styles }} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
