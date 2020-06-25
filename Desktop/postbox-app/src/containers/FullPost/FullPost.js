import React, { Component } from "react";
import Button from "./../../components/UI/Button/Button";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
    upvoted: false,
    downvoted: false,
  };

  componentDidMount() {
    console.log(this.props.location.state.isLoggedin);
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
    axios
      .get(
        "http://localhost:7000/api/v1/posts/upvote/" +
          this.props.match.params.id,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ upvoted: true, downvoted: false });
      })
      .catch((err) => console.log(err));
  };

  downVotedPost = () => {
    axios
      .get(
        "http://localhost:7000/api/v1/posts/downvote/" +
          this.props.match.params.id,
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
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          {/* <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div> */}
          <h4>Post By : {this.state.loadedPost.author}</h4>
          {!this.props.location.state.isLoggedin ? (
            <div className="Properties">
              <p className="Votes">upvotes:{this.state.loadedPost.upvotes}</p>
              <p className="Votes">
                downvotes:{this.state.loadedPost.downvotes}
              </p>
            </div>
          ) : (
            <div className="Properties">
              <p className="Votes">
                <Button
                  btnType="Success"
                  clicked={this.upvotedPost}
                  selected={this.state.upvoted}
                >
                  Upvotes
                </Button>
                {this.state.loadedPost.upvotes}
              </p>
              <p className="Votes">
                <Button
                  btnType="Danger"
                  clicked={this.downVotedPost}
                  selected={this.state.downvoted}
                >
                  Downvotes
                </Button>
                {this.state.loadedPost.downvotes}
              </p>
            </div>
          )}
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
