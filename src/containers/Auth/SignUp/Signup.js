import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";

import { NavLink } from "react-router-dom";
import "./Signup.css";
class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    isLoggedin: false,
    isLoading: false,
  };

  checkIsLoggedIn = () => {
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:7000/api/v1/users/loginStatus", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ isLoggedin: true, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  componentDidMount() {
    this.checkIsLoggedIn();
  }

  SignupUserHandler = (props) => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    console.log(user);

    axios
      .post("http://localhost:7000/api/v1/users/signup", user, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);
        console.log(response.data);
        this.setState({ isLoggedin: true, isLoading: false });
      })
      .catch((error) => {
        window.alert("invalid email or password");
      });
  };

  // logoutUserHandler = (props) => {
  //   axios
  //     .get("http://localhost:7000/api/v1/users/logout", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       // this.setState({ isLoggedin: false });
  //       window.location.reload(false);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // signupState = () => {
  //   this.setState({ toSignup: true });
  // };
  render() {
    let loggedInPage = (
      <div className="Login">
        <div className="Form">
          <h1>SIGN UP</h1>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
            placeholder="Your name"
            required
          />
          <br></br>
          <br></br>
          <input
            type="email"
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}
            placeholder="Your Email Id"
            required
          />
          <br></br>
          <br></br>

          <input
            type="password"
            value={this.state.password}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
            placeholder="Your Password"
            required
          />
          <br></br>
          <br></br>

          <input
            type="password"
            value={this.state.passwordConfirm}
            onChange={(event) =>
              this.setState({ passwordConfirm: event.target.value })
            }
            placeholder="Retype password"
            required
          />
          <Button btnType="Success" clicked={this.SignupUserHandler}>
            Sign Up
          </Button>
          <p>
            Already a member ?<NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    );

    return <div>{!this.state.isLoading ? loggedInPage : <Spinner />}</div>;
  }
}

export default Signup;
