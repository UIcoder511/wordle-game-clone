import { SpringValue, animated, useSpring } from "@react-spring/web";
import useOutsideClickHandler from "hooks/useOutsideClickHandler";
import React, { useEffect, useRef, useState } from "react";
import Tutorial from "staticUI/Tutorial/Tutorial";
import { styled } from "stitches.config";
import GridButton from "ui/GridButton/GridButton";

const Overlay = styled("div", {
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AnimatedOverlay = animated(Overlay);

const TutorialContainer = () => {
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  // const outsideRef = useRef(null);
  const { elementRef } = useOutsideClickHandler(() => setShowTutorial(false));

  const springOpacity = new SpringValue(0);

  useEffect(() => {
    springOpacity.start(!showTutorial ? 0 : 1);
    // return () => {
    //   springOpacity.finish();
    // };
  }, [showTutorial]);

  return (
    <div>
      <GridButton
        onClick={() => setShowTutorial((prev) => !prev)}
        styles={{
          gridCellContainer: {
            position: "absolute",
            border: "none",
            top: "5px",
            right: "5px",
            zIndex: "1000",
            width: "60px",
            height: "60px",
            // borderRadius: "",
            // backgroundColor: "var(--gray)",
            // color: "var(--white)",
            // fontSize: "0.8rem",
            // fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "var(--gray-dark)",
            },
          },
          gridCell: {
            fontSize: "2rem",
            "&:hover": {
              borderBottomWidth: "5px",
            },
            // color: "var(--white)",
            // WebkitTextStroke: "2px #555",
          },
        }}
      >
        ?
      </GridButton>

      {showTutorial && (
        <AnimatedOverlay
          style={{ opacity: springOpacity }}
          // style={{ display: showTutorial ? "flex" : "none" }}
          ref={elementRef}
        >
          <Tutorial />
        </AnimatedOverlay>
      )}
    </div>
  );
};

export default TutorialContainer;
