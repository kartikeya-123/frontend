import React from "react";
import "./Toolbar.css";
import NavigationItems from "./../../Navigation/NavigationItems/NavigationItems";
const toolbar = (props) => (
  <header className="toolbar">
    <nav>
      <NavigationItems isLoggedin={props.isLoggedin} />
    </nav>
  </header>
);

export default toolbar;
