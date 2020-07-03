import React, { Component } from "react";
import Post from "./../../../components/Post/Post";
import Aux from "./../../../hoc/Auxil/Auxil";
// import FullPost from "./../FullPost/FullPost";
import classes from "./MyPosts.css";
import axios from "axios";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import NavigationItem from "../../Navigation/NavigationItem/NavigationItem";
import Modal from "./../../UI/Modal/Modal";
// import {Link} from 'react-router-dom'
import Button from "./../../../components/UI/Button/Button";
class MyPosts extends Component {
  state = {
    posts: [],
    isLoading: true,
    show: false,
    deleted: false,
  };

  componentDidMount() {
    // connecting with server
    console.log(this.props);
    this.setState({ isLoading: true });
    axios
      .get("http://localhost:7000/api/v1/posts/my-posts", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data.docs);
        console.log(response.data.data);
        const posts = response.data.data.posts;
        this.setState({ posts: posts, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fullPostHandler = (id) => {
    // window.alert("post clicked");
    // this.props.history.push({
    //   pathname: "/posts/" + id,
    //   state: { isLoggedin: this.state.isLoggedin },
    // });
    this.props.history.push("/posts/" + id);
  };

  // deleting posts//
  deletePostHandler = (id, userId) => {
    const data = {
      userId: userId,
    };
    axios
      .post(`http://localhost:7000/api/v1/posts/${id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
        this.setState({ show: false, deleted: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkconfirmDelete = () => {
    this.setState({ show: true });
  };
  closeModal = () => {
    this.setState({ show: false });
  };
  continue = () => {
    this.setState({ deleted: false });
  };
  render() {
    const deletedMessage = (
      <div>
        <h2>Post successfully deleted</h2>
        <br></br>
        <Button btnType="Success" clicked={this.continue}>
          Continue
        </Button>
      </div>
    );
    let posts;
    if (this.state.isLoading) {
      posts = <Spinner />;
    } else if (this.state.posts.length === 0) {
      return (
        <Aux>
          <h2>You did not write any post</h2>
          <h3>
            Write your first post{" "}
            <NavigationItem link="/new-post">New Post</NavigationItem>
          </h3>
        </Aux>
      );
    } else {
      posts = this.state.posts.map((currPost) => {
        return (
          <Post
            title={currPost.title}
            author={currPost.author}
            upvotes={currPost.upvotes}
            downvotes={currPost.downvotes}
            body={currPost.body}
            key={currPost._id}
            delete="true"
            show={this.state.show}
            checkdelete={this.checkconfirmDelete}
            goBack={this.closeModal}
            deletePost={() =>
              this.deletePostHandler(currPost._id, currPost.User)
            }
            clicked={() => this.fullPostHandler(currPost._id)}
            isLoggedin={this.state.isLoggedin}
          />
        );
      });
    }

    return (
      <Aux>
        <Modal show={this.state.deleted}>{deletedMessage}</Modal>
        <div>
          <h1 className={classes.Header}>
            <strong>MY POSTS</strong>
          </h1>
        </div>
        <section className={classes.Posts}>{posts}</section>
      </Aux>
    );
  }
}

export default MyPosts;
