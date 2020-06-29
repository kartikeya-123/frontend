import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

const NavigationItem = (props) => {
  let classProperty = "NavigationItem";
  switch (props.classProperty) {
    case "my-posts":
      classProperty = "NavigationItemmy-posts";
      break;
    default:
      break;
  }

  return (
    <li className={classProperty}>
      <NavLink
        to={props.link}
        exact
        activeClassName="active-doc"
        activeStyle={{
          color: "skyblue",
          fontSize: "bolder",
        }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
