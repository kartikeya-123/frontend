import React, { Component } from "react";
import NavigationItem from "./../NavigationItem/NavigationItem";
import Aux from "./../../../hoc/Auxil/Auxil";
// import { loginStatus } from "./../../LoginStatus";
import "./NavigationItems.css";

class NavigationItems extends Component {
  state = {
    isLoggedin: false,
    isLoading: false,
  };

  // checkIsLoggedIn = () => {
  //   this.setState({ isLoading: true });
  //   axios
  //     .get("http://localhost:7000/api/v1/users/loginStatus", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({ isLoggedin: true, isLoading: false });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({ isLoading: false });
  //     });
  // };
  componentDidMount() {
    this.setState({ isLoggedin: this.props.isLoggedin });
  }
  // componentWillUpdate() {
  //   this.setState({ isLoggedin: this.props.isLoggedin });
  // }

  render() {
    return (
      <Aux>
        {!this.props.isLoggedin ? (
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
            <NavigationItem link="/login">LOGOUT</NavigationItem>
          </ul>
        )}
      </Aux>
    );
  }
}

export default NavigationItems;
