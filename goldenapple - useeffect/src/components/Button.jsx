import React from "react";

const Button = (props) => {
  return (
    <React.Fragment>
      <button onClick={props.onClick}>{props.text}</button>
    </React.Fragment>
  );
};

export default Button;
