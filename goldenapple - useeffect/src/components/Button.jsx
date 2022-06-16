import React from "react";

const Button = (props) => {
  const { onClick, text } = props;
  return (
    <React.Fragment>
      <button onClick={onClick}>{text}</button>
    </React.Fragment>
  );
};

export default Button;
