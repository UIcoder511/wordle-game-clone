import React, { useLayoutEffect, useRef, useState } from "react";
import { styled, theme } from "stitches.config";

type Props = {
  title: string;
  children: React.ReactNode;
  styles?: {
    container?: React.CSSProperties;
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
    bodyWrapper?: React.CSSProperties;
  };
  style?: React.CSSProperties;
};

const MenuHeader = styled("div", {
  borderBottom: "4px solid #c274e3",
  borderRadius: "25px",
  backgroundColor: "#dddbff",
  color: "#682fc6",
  fontWeight: 800,
  fontSize: "2rem",
  padding: "10px 60px",
  position: "relative",
  width: "fit-content",
  // zIndex: 1,
  "&::before": {
    content: "",
    position: "absolute",
    left: -10,
    top: -10,
    right: -10,
    bottom: -10,

    border: "8px solid #ffffff",
    borderRadius: "32px",
    background: "#fff",
    zIndex: -1,
  },
});
const MenuBody = styled("div", {
  width: "calc(100% - 3px)",
  height: "calc(100% - 10px)",
  // position:'absolute',
  zIndex: -1,
  borderRadius: "28px",
  background: "#fff",
  // marginTop: "-10px",
});
const MenuContainer = styled("div", {
  position: "absolute",
  zIndex: 4,
  // top: "50%",
  // transform: "translateY(-50%)",
  // minWidth: "0%",
  // height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const MenuBodyWrapper = styled("div", {
  position: "relative",
  //    width:'100%',
  //    height:'100%',
  display: "flex",
  justifyContent: "center",
  minWidth: "30%",
  minHeight: "40%",
  content: "",
  // position/:'absolute',
  left: 0,
  top: 10,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(90deg, rgba(158,118,249,1) 0%, rgba(77,84,188,1) 50%, rgba(109,191,251,1) 100%)",
  zIndex: -3,

  borderRadius: "24px",
});

const Footer = styled("div", {
  position: "absolute",
  //    width:'100%',
  //    height:'100%',
  minWidth: "80%",
  height: "60px",
  content: "",
  // position:'absolute',
  display: "flex",
  //  left:0,
  //  top:10,
  //  right:0,
  bottom: "-20px",
  background:
    "linear-gradient(90deg, rgba(158,118,249,1) 0%, rgba(77,84,188,1) 50%, rgba(109,191,251,1) 100%)",
  zIndex: 1,

  borderRadius: "24px",
  "&::before": {
    content: "",
    display: "block",
    width: "100%",
    height: "50px",
    // position:'absolute',
    borderRadius: "24px",
    background: "#fff",
  },
});

const MenuCard: React.FC<Props> = ({ title, children, styles, style }) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (titleRef.current) setHeaderHeight(titleRef.current.clientHeight);
  }, []);

  const titleRef = useRef<HTMLDivElement>(null);
  return (
    <MenuContainer
      className="menu-container"
      css={{ ...styles?.container }}
      style={style}
    >
      {/* <MenuHeaderWrapper ref={titleRef}> */}
      <MenuHeader ref={titleRef} css={{ ...styles?.header }}>
        {title}
      </MenuHeader>
      {/* </MenuHeaderWrapper> */}
      <MenuBodyWrapper
        className="menu-body"
        css={{ marginTop: -headerHeight / 2, ...styles?.bodyWrapper }}
      >
        <MenuBody css={{ paddingTop: headerHeight / 2, ...styles?.body }}>
          {children}
        </MenuBody>
        <Footer className="menu-footer" css={{ ...styles?.footer }}></Footer>
      </MenuBodyWrapper>
    </MenuContainer>
  );
};

export default MenuCard;
