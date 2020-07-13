import React, { Component } from 'react';
import Post from './../../../components/Post/Post';
// import { UpvoteOrDisvoteHandler } from "./../../../containers/Posts/Posts";
import Aux from './../../../hoc/Auxil/Auxil';
// import FullPost from "./../FullPost/FullPost";
import classes from './../../../containers/Posts/Posts.css';
import axios from 'axios';
import Spinner from './../../../components/UI/Spinner/Spinner';
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';
import Modal from './../../UI/Modal/Modal';
import UserContext from './../../../hoc/Context/UserContext';

// import {Link} from 'react-router-dom'
import Button from './../../../components/UI/Button/Button';
// import Profile from "./../../Profile/Profile";
class MyPosts extends Component {
  state = {
    posts: [],
    isLoading: true,
    show: false,
    deleted: false,
    upvoted: false,
    downvoted: false,
  };
  static contextType = UserContext;
  componentDidMount() {
    // connecting with server
    console.log(this.props);
    this.setState({ isLoading: true });
    axios
      .get('http://localhost:7000/api/v1/posts/my-posts', {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data.docs);
        console.log(response.data.data);
        const posts = response.data.data.docs;
        this.setState({ posts: posts, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  UpvoteOrDisvoteHandler = (vote, id, upvotes, downvotes) => {
    const data = {
      postId: id,
    };

    axios
      .patch(`http://localhost:7000/api/v1/posts/${vote}/${id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        // updating post upvotes and downvotes//
        var up = false;
        var down = false;
        const updatePosts = [...this.state.posts];
        const postIndex = updatePosts.findIndex((post) => post._id === id);
        const postElement = updatePosts[postIndex];
        postElement.upvotes = response.data.upvotes;
        postElement.downvotes = response.data.downvotes;
        postElement.upvotedBy = response.data.upvotedBy;
        postElement.downvotedBy = response.data.downvotedBy;
        updatePosts[postIndex] = postElement;
        if (upvotes < response.data.upvotes) up = true;
        if (downvotes < response.data.downvotes) down = true;
        this.setState({ posts: updatePosts, upvoted: up, downvoted: down });
      })
      .catch((err) => console.log(err));
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
        console.log(response.data);
        // window.location.reload(false);
        let oldPosts = [...this.state.posts];
        let newPosts = oldPosts.filter((post) => {
          return post._id !== id;
        });
        this.setState({
          posts: newPosts,
          show: false,
          deleted: true,
        });
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
          <h3>Write your first post</h3>
          <NavigationItem link="/new-post" classProperty="my-posts">
            New Post
          </NavigationItem>
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
            upvotedBy={currPost.upvotedBy}
            downvotedBy={currPost.downvotedBy}
            delete="true"
            show={this.state.show}
            checkdelete={this.checkconfirmDelete}
            goBack={this.closeModal}
            deletePost={() =>
              this.deletePostHandler(currPost._id, currPost.User)
            }
            clicked={() => this.fullPostHandler(currPost._id)}
            isLoggedin={this.state.isLoggedin}
            upvoted={this.state.upvoted}
            downvoted={this.state.downvoted}
            upvote={() =>
              this.UpvoteOrDisvoteHandler(
                'upvote',
                currPost._id,
                currPost.upvotes,
                currPost.downvotes
              )
            }
            downvote={() =>
              this.UpvoteOrDisvoteHandler(
                'downvote',
                currPost._id,
                currPost.upvotes,
                currPost.downvotes
              )
            }
          />
        );
      });
    }

    return (
      <Aux>
        <Modal show={this.state.deleted}>{deletedMessage}</Modal>
        <article>
          <section className={classes.Posts}>
            <div className={classes.Header}>
              <h1 style={{ textTransform: 'capitalize' }}>
                {this.context.user.name ? this.context.user.name + "'s" : null}{' '}
                posts
              </h1>
            </div>
          </section>
          <section className={classes.Posts}>{posts}</section>
        </article>
      </Aux>
    );
  }
}

export default MyPosts;
