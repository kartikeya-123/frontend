import React from "react";
import Aux from "../../hoc/Auxil/Auxil";
import classes from "./Layout.css";

const layout = (props) => (
  <Aux>
    Toolbar Starter Maincourse Desert
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);
export default layout;
