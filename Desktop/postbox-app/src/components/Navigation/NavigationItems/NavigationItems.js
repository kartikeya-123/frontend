import React from "react";
import NavigationItem from "./../NavigationItem/NavigationItem";
import "./NavigationItems.css";
const NavigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" active>
      HOME
    </NavigationItem>

    <NavigationItem link="/signup">Sign Up </NavigationItem>

    <NavigationItem link="/login">Sign In</NavigationItem>

    <NavigationItem link="/new-post">New Post</NavigationItem>
  </ul>
);

export default NavigationItems;
