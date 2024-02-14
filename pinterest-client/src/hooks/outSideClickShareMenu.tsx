import { useEffect, useRef, useState } from "react";

export const useOutSideClickShareMenu = (initialValue: boolean) => {
  const ref2 = useRef<HTMLDivElement>(null);

  const [visibleShareMenu, setVisibleShareMenu] = useState(initialValue);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref2.current && !ref2.current.contains(event.target as Node))
      setVisibleShareMenu(false);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") setVisibleShareMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleKeyPress, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyPress, true);
    };
  }, [ref2]);

  return { ref2, visibleShareMenu, setVisibleShareMenu };
};
