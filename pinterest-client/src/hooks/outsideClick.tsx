import { useEffect, useRef, useState } from "react";

export const useOutsideClick = (initialValue: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(initialValue);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node))
      setVisible((prev) => !prev);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") setVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleKeyPress, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyPress, true);
    };
  }, [ref]);

  return { ref, visible, setVisible };
};
