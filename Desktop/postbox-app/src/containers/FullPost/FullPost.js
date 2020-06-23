import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    console.log(this.props);
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
          <div className="Properties">
            <p className="Votes">upvotes:{this.state.loadedPost.upvotes}</p>
            <p className="Votes">downvotes:{this.state.loadedPost.downvotes}</p>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
