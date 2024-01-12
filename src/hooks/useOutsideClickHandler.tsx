import React, { FC, MouseEvent, useEffect, useRef } from "react";

// interface Props {
//   ref: ;
//   clickHanlder: () => void;
// }

const useOutsideClickHandler = (clickHanlder: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  // console.log("first");
  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (ref.current && ref.current === (e.target as HTMLElement)) {
        console.log(ref.current, e.target);
        clickHanlder();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, clickHanlder]);

  return { elementRef: ref } as const;
};

export default useOutsideClickHandler;
