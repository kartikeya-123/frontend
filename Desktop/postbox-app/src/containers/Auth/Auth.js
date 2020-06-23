import React, { Component } from "react";
// import Aux from "./../../hoc/Auxil/Auxil";
import Button from "./../../components/UI/Button/Button";
import axios from "axios";
import "./Auth.css";
class Auth extends Component {
  state = {
    email: "",
    password: "",
    isLoggedin: false,
  };
  ///
  //if a user is logged in we have to get the status from the backend//

  checkIsLoggedIn = () => {
    axios
      .get("http://localhost:7000/api/v1/users/loginStatus", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ isLoggedin: true });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.checkIsLoggedIn();
  }

  //   inputEmail = (event) => {
  //     this.setState({ email: event.target.value });
  //   };

  //   inputPassword = (event) => {
  //     this.setState({ password: event.target.value });
  //   };

  loginUserHandler = (props) => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);

    axios
      .post("http://localhost:7000/api/v1/users/login", user, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);

        this.setState({ isLoggedin: true });
      })
      .catch((error) => {
        window.alert("invalid email or password");
      });
  };

  logoutUserHandler = (props) => {
    axios
      .get("http://localhost:7000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);
        // this.setState({ isLoggedin: false });
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  render() {
    let loggedInPage = (
      <div className="Login">
        <h1>You can Login here</h1>

        <label className="Email"> Email</label>
        <input
          type="email"
          value={this.state.email}
          onChange={(event) => this.setState({ email: event.target.value })}
          placeholder="Your Email Id"
          required
        />
        <br></br>
        <br></br>
        <label>Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={(event) => this.setState({ password: event.target.value })}
          placeholder="Your Password"
          required
        />
        <Button btnType="Success" clicked={this.loginUserHandler}>
          Sign In
        </Button>
      </div>
    );

    if (this.state.isLoggedin) {
      loggedInPage = (
        <div>
          <h1>YOU Are Logged In</h1>
          <Button clicked={this.logoutUserHandler}>LOGOUT</Button>
        </div>
      );
    }

    return <div>{loggedInPage}</div>;
  }
}

export default Auth;
