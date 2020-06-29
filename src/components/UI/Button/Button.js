import React from "react";
import "./Button.css";

const button = (props) => {
  // if(props.btnType="Success")
  let classProperty;
  switch (props.btnType) {
    case "Success":
      classProperty = "Button Success";
      break;
    case "Danger":
      classProperty = "Button Danger";
      break;
    case "Authenticate":
      classProperty = " Authenticate";
      break;
    default:
      classProperty = "Button";
      break;
  }
  if (props.selected) {
    classProperty = "disabled";
  }
  return (
    <button className={classProperty} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default button;
