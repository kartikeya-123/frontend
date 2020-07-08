import React, { Component } from "react";
// import Button from "./../../components/UI/Button/Button";
import axios from "axios";
import UserContext from "./../../hoc/Context/UserContext";
import classes from "./FullPost.css";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
class FullPost extends Component {
  state = {
    loadedPost: null,
    upvoted: false,
    downvoted: false,
  };
  static contextType = UserContext;
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios
          .get(
            "http://localhost:7000/api/v1/posts/" + this.props.match.params.id
          )
          .then((response) => {
            // console.log(response);
            this.setState({ loadedPost: response.data.data.doc });
          });
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("updating post");
    if (!this.state.loadedPost) return true;
    else {
      return (
        nextState.loadedPost.upvotes !== this.state.loadedPost.upvotes ||
        nextState.loadedPost.downvotes !== this.state.loadedPost.downvotes
      );
    }
  }

  //   deletePostHandler = () => {
  //     axios.delete("/posts/" + this.props.match.params.id).then((response) => {
  //       console.log(response);
  //     });
  //   };

  upvotedPost = () => {
    const post = this.state.loadedPost;
    axios
      .patch(
        "http://localhost:7000/api/v1/posts/upvote/" +
          this.props.match.params.id,
        post,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ upvoted: true, downvoted: false });
      })
      .catch((err) => console.log(err));
  };

  downVotedPost = () => {
    const post = this.state.loadedPost;
    axios
      .patch(
        "http://localhost:7000/api/v1/posts/downvote/" +
          this.props.match.params.id,
        post,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ downvoted: true, upvoted: false });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    let cursor = null;
    let upvote = null;
    let downvote = null;
    if (this.context.isLoggedin) {
      cursor = "pointer";
      upvote = this.upvotedPost;
      downvote = this.downVotedPost;
    }

    if (this.state.loadedPost) {
      post = (
        <div className={classes.FullPost}>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          {/* <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div> */}
          <h4>Post By : {this.state.loadedPost.author}</h4>
          <div className={classes.Properties}>
            <p className={classes.Votes}>
              <AiFillLike
                onClick={upvote}
                // selected={this.state.upvoted}
                cursor={cursor}
                color="rgb(13, 188, 247)"
                size="28px"
              />
              <br></br>
              {this.state.loadedPost.upvotes}
            </p>
            <p className={classes.Votes}>
              <AiFillDislike
                onClick={downvote}
                // selected={this.state.upvoted}
                cursor={cursor}
                color="#fb655a"
                size="28px"
              />
              <br></br>
              {this.state.loadedPost.downvotes}
            </p>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
