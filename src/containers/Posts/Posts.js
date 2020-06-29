import React, { Component } from "react";
import Post from "./../../components/Post/Post";
import Aux from "./../../hoc/Auxil/Auxil";
// import FullPost from "./../FullPost/FullPost";
import "./Posts.css";
import axios from "axios";
import Spinner from "./../../components/UI/Spinner/Spinner";
// import {Link} from 'react-router-dom'
// import Button from './../../components/UI/Button/Button'
class Posts extends Component {
  state = {
    posts: [],
    isLoading: true,
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
    // connecting with server
    console.log(this.props);
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:7000/api/v1/posts")
      .then((response) => {
        // console.log(response.data.data.docs);
        const posts = response.data.data.docs.slice(0, 8);
        this.setState({ posts: posts, isLoading: false });
        this.checkIsLoggedIn();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fullPostHandler = (id) => {
    // window.alert("post clicked");
    this.props.history.push("/posts/" + id);
  };
  render() {
    let posts;
    if (this.state.isLoading) {
      posts = <Spinner />;
    } else {
      posts = this.state.posts.map((currPost) => {
        return (
          <Post
            title={currPost.title}
            author={currPost.author}
            upvotes={currPost.upvotes}
            key={currPost._id}
            clicked={() => this.fullPostHandler(currPost._id)}
            isLoggedin={this.state.isLoggedin}
          />
        );
      });
    }

    return (
      <Aux>
        <div>
          <h1 className="Header">
            <strong>RECENT POSTS</strong>
          </h1>
        </div>
        <section className="Posts">{posts}</section>
      </Aux>
    );
  }
}

export default Posts;
