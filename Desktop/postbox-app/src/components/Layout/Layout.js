import React from "react";
import Aux from "./../../hoc/Auxil/Auxil";
import "./Layout.css";
import Toolbar from "./../UI/Toolbar/Toolbar";
import Posts from "./../../containers/Posts/Posts";
import FullPost from "./../../containers/FullPost/FullPost";
import NewPost from "./../../containers/NewPost/NewPost";
import Auth from "./../../containers/Auth/Auth";
import { Route, Switch } from "react-router-dom";
const Layout = (props) => (
  <Aux>
    <Toolbar />
    <article className="Welcome">WELCOME TO POSTBOX</article>
    <Switch>
      <Route path="/" exact component={Posts} />
      <Route path="/signup" render={() => <h1>SIGNUP PAGE</h1>} />
      <Route path="/login" exact component={Auth} />
      <Route path="/posts/:id" exact component={FullPost} />
      <Route path="/new-post" exact component={NewPost} />
      <Route render={() => <h1>PAGE NOT FOUND</h1>} />
    </Switch>
  </Aux>
);

export default Layout;
