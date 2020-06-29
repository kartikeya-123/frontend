import React from "react";
import "./Input.module.css";

const input = (props) => {
  let validationError;
  let inputElement = null;
  const inputClasses = "InputElement";

  //   if (props.inValid && props.touched) {
  //     inputClasses.push(classes.Invalid);
  //     validationError = <p>please enter a valid value</p>;
  //   }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className="InputElement"
          {...props.elementConfig}
          onChange={props.changedValue}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changedValue}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          onChange={props.changedValue}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changedValue}
        />
      );
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
