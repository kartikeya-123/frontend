import React from "react";
import "./Toolbar.css";
import NavigationItems from "./../../Navigation/NavigationItems/NavigationItems";
const toolbar = (props) => (
  <header className="toolbar">
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
