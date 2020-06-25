import React, { Component } from "react";
import Aux from "./../../hoc/Auxil/Auxil";
import "./Layout.css";
import Toolbar from "./../UI/Toolbar/Toolbar";
import Posts from "./../../containers/Posts/Posts";
import FullPost from "./../../containers/FullPost/FullPost";
import NewPost from "./../../containers/NewPost/NewPost";
import Login from "../../containers/Auth/Login/Login";
import Signup from "../../containers/Auth/SignUp/Signup";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
class Layout extends Component {
  state = {
    isLoggedin: false,
  };

  checkIsLoggedIn = () => {
    axios
      .get("http://localhost:7000/api/v1/users/loginStatus", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ isLoggedin: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    // console.log("checking status");
    this.checkIsLoggedIn();
  }
  // componentWillMount() {
  //   this.checkIsLoggedIn();
  // }

  render() {
    return (
      <Aux>
        <Toolbar isLoggedin={this.state.isLoggedin} />
        <article className="Welcome">WELCOME TO POSTBOX</article>
        <body>
          <div>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route path="/posts/:id" exact component={FullPost} />
              <Route path="/new-post" exact component={NewPost} />
              <Route render={() => <h1>PAGE NOT FOUND</h1>} />
            </Switch>
          </div>
        </body>
      </Aux>
    );
  }
}

export default Layout;
