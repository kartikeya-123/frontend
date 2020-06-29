import React, { useContext } from "react";
import NavigationItem from "./../NavigationItem/NavigationItem";
import Aux from "./../../../hoc/Auxil/Auxil";
// import { loginStatus } from "./../../LoginStatus";
import UserContext from "./../../../hoc/Context/UserContext";
import "./NavigationItems.css";

const NavigationItems = () => {
  const value = useContext(UserContext);
  return (
    <Aux>
      {!value.isLoggedin ? (
        <ul className="NavigationItems">
          <NavigationItem link="/" active>
            HOME
          </NavigationItem>
          <NavigationItem link="/login">Sign in</NavigationItem>
          <NavigationItem link="/signup">Sign up</NavigationItem>
          <NavigationItem link="/new-post">New Post</NavigationItem>
        </ul>
      ) : (
        <ul className="NavigationItems">
          <NavigationItem link="/" active>
            HOME
          </NavigationItem>
          <NavigationItem link="/new-post">New Post</NavigationItem>
          <NavigationItem link="/login">Profile</NavigationItem>
        </ul>
      )}
    </Aux>
  );
};

export default NavigationItems;
