import React, { Component } from "react";
import Aux from "./../../hoc/Auxil/Auxil";
import classes from "./Layout.css";
import Toolbar from "./../UI/Toolbar/Toolbar";
import Posts from "./../../containers/Posts/Posts";
import FullPost from "./../../containers/FullPost/FullPost";
import NewPost from "./../../containers/NewPost/NewPost";
import Login from "../../containers/Auth/Login/Login";
import Signup from "../../containers/Auth/SignUp/Signup";
import ForgotPassword from "../../containers/Auth/ForgotPassword";
import { Route, Switch } from "react-router-dom";
import MyPosts from "./../Profile/MyPosts/MyPosts";
import axios from "axios";
import UserContext, { UserProvider } from "./../../hoc/Context/UserContext";
import Sidedrawer from "./../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    isLoggedin: false,
    userRole: "",
    showSideDrawer: false,
  };
  static contextType = UserContext;
  checkIsLoggedIn = () => {
    axios
      .get("http://localhost:7000/api/v1/users/loginStatus", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.role);
        this.setState({ isLoggedin: true, userRole: response.data.role });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    // console.log("checking status");
    this.checkIsLoggedIn();
  }
  // s
  showSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <UserProvider
        value={{
          isLoggedin: this.state.isLoggedin,
          role: this.state.userRole,
        }}
      >
        <Aux>
          <Toolbar clicked={this.showSideDrawer} />
          {/* <article className={classes.Welcome}>WELCOME TO POSTBOX</article> */}
          <Sidedrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}
          />
          <div className={classes.Body}>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route path="/posts/:id" exact component={FullPost} />
              <Route path="/new-post" exact component={NewPost} />
              <Route path="/my-posts" exact component={MyPosts} />
              <Route path="/forgotPassword" exact component={ForgotPassword} />
              <Route render={() => <h1>PAGE NOT FOUND</h1>} />
            </Switch>
          </div>
        </Aux>
      </UserProvider>
    );
  }
}

export default Layout;
