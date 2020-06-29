import React, { Component } from "react";
import axios from "axios";
import UserContext from "./../../hoc/Context/UserContext";
import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    isLoading: true,
  };
  static contextType = UserContext;

  newPostHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
    };
    console.log(data);
    axios
      .post("http://localhost:7000/api/v1/posts", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

        this.props.history.push("/");
        window.location.reload(false);
      });
  };

  render() {
    return (
      <div className="NewPost">
        {this.context.isLoggedin ? (
          <div>
            <h1>Add a Post</h1>
            <label>Title</label>
            <textarea
              rows="3"
              columns="10"
              value={this.state.title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <label>Content</label>
            <textarea
              value={this.state.body}
              rows="10"
              onChange={(event) => this.setState({ body: event.target.value })}
            />
            {/* <label>Author</label>
            <textarea
              value={this.state.author}
              onChange={(event) =>
                this.setState({ author: event.target.value })
              }  */}
            {/* /* /> */}
            <button onClick={this.newPostHandler}>Add Post</button>
          </div>
        ) : (
          <h1>Login to write a post </h1>
        )}
      </div>
    );
  }
}

export default NewPost;
