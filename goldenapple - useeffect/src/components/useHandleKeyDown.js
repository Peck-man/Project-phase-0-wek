import React, { useState } from "react";

export function useHandleKeyDown() {
  const [count, setCount] = useState(0);
  function handleKeyDown(e) {
    if (e.keyCode === 38) {
      setCount(count + 1);
    }

    if (e.keyCode === 40) {
      count > 0 && setCount(count - 1);
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]);
  return [count, setCount];
}
