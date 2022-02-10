import { RefObject, useEffect } from "react";

const useOnClickOutside = (ref: RefObject<Element>, toggle: () => void) => {
  const handleOutsideClick = (event: MouseEvent) => {
    console.log(event.type);
    console.log(event.target);
    console.log(ref);
    const path = event.composedPath();
    if (ref.current && !path.includes(ref.current)) {
      toggle();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, []);
};

export default useOnClickOutside;
