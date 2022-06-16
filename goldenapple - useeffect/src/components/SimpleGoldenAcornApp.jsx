import React from "react";
import Button from "./Button";
import Display from "./Display";
import { useHandleKeyDown } from "./useHandleKeyDown";

const SimpleGoldenAcornApp = () => {
  const [count, setCount] = useHandleKeyDown();

  return (
    <div>
      <Button text="Buy one" onClick={() => setCount(count + 1)} />
      <Display children={count} />
      <Button text="Eat one" onClick={() => count > 0 && setCount(count - 1)} />
    </div>
  );
};

export default SimpleGoldenAcornApp;
