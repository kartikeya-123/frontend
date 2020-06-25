import React, { Component } from "react";
// import Aux from "./../../hoc/Auxil/Auxil";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import "./Login.css";
import { NavLink } from "react-router-dom";
class Auth extends Component {
  state = {
    email: "",
    password: "",
    isLoggedin: false,
    isLoading: true,
  };
  ///
  //if a user is logged in we have to get the status from the backend//

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

        this.setState({ isLoggedin: true, isLoading: false });
        this.props.history.push("/");
        window.location.reload(false);
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
  signupState = () => {
    this.setState({ toSignup: true });
  };
  render() {
    let loggedInPage = (
      <div className="Login">
        <div className="Form">
          <h1>Login</h1>
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
          <Button btnType="Success" clicked={this.loginUserHandler}>
            Sign In
          </Button>
          <p>
            Not a member ?<NavLink to="/signup">Sign up</NavLink>
          </p>
        </div>
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

    return <div>{!this.state.isLoading ? loggedInPage : <Spinner />}</div>;
  }
}

export default Auth;
