import React from "react";
import "./Post.css";
const Post = (props) => (
  <article className="Post" onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className="Author">
      <p>Post by : {props.author}</p>
    </div>
    <div className="Upvotes">
      <p>upvotes : {props.upvotes}</p>
    </div>
  </article>
);

export default Post;
