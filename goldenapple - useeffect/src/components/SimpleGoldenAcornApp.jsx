import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";

const SimpleGoldenAcornApp = () => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 38) {
        setCount(count + 1);
      }

      if (e.keyCode === 40) {
        count > 0 && setCount(count - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]);

  return (
    <div>
      <Button text="Buy one" onClick={() => setCount(count + 1)} />
      <Display children={count} />
      <Button text="Eat one" onClick={() => count > 0 && setCount(count - 1)} />
    </div>
  );
};

export default SimpleGoldenAcornApp;
