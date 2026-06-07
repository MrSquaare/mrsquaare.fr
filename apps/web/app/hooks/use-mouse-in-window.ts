import { useEffect, useRef } from "react";

export const useMouseInWindow = () => {
  const isInWindow = useRef(true);

  useEffect(() => {
    const handleMouseEnter = () => {
      isInWindow.current = true;
    };

    const handleMouseLeave = () => {
      isInWindow.current = false;
    };

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return isInWindow;
};
