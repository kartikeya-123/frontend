import React, { Component } from 'react';
import classes from './Post.css';
import Modal from './../UI/Modal/Modal';
import Aux from './../../hoc/Auxil/Auxil';
import Button from './../UI/Button/Button';
import UserContext from './../../hoc/Context/UserContext';
// import { AiFillLike } from "react-icons/ai";

import {
  AiFillLike,
  AiFillDislike,
  AiFillDelete,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai';
class Post extends Component {
  state = {
    showMore: false,
  };
  static contextType = UserContext;
  // const value = useContext(UserContext);
  // let dropdown;
  // if (this.props.userRole === "admin") {
  //   dropdown = (
  //     <span>
  //       <Button btnType="Danger" clicked={props.blacklistPost}>
  //         Blacklist
  //       </Button>
  //     </span>
  //   );
  // }

  showMoreHandler = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  render() {
    let like = (
      <AiOutlineLike
        onClick={this.context.isLoggedin ? this.props.upvote : null}
        cursor={this.context.isLoggedin ? 'pointer' : null}
        color="rgba(151, 146, 146, 0.609)"
        size="24px"
      />
    );
    let Dislike = (
      <AiOutlineDislike
        onClick={this.context.isLoggedin ? this.props.downvote : null}
        cursor={this.context.isLoggedin ? 'pointer' : null}
        color="rgba(151, 146, 146, 0.609)"
        size="24px"
      />
    );
    for (let i = 0; i < this.props.upvotedBy.length; i++) {
      if (this.props.upvotedBy[i].id === this.context.user._id) {
        like = (
          <AiFillLike
            onClick={this.context.isLoggedin ? this.props.upvote : null}
            cursor={this.context.isLoggedin ? 'pointer' : null}
            color={this.context.isLoggedin ? 'rgb(107, 210, 245)' : null}
            size="24px"
          />
        );
      }
    }
    for (let i = 0; i < this.props.downvotedBy.length; i++) {
      if (this.props.downvotedBy[i].id === this.context.user._id) {
        Dislike = (
          <AiFillDislike
            onClick={this.context.isLoggedin ? this.props.downvote : null}
            cursor={this.contextisLoggedin ? 'pointer' : null}
            color={this.context.isLoggedin ? 'rgb(151, 100, 100)' : null}
            size="24px"
          />
        );
      }
    }
    const deletePostmessage = (
      <div>
        <h2>Delete Post</h2>
        <p>
          Are you sure you wish to delete this answer? This action can be
          undone.
        </p>
        <Button btnType="Cancel" clicked={this.props.goBack}>
          Cancel
        </Button>
        <Button btnType="Danger" clicked={this.props.deletePost}>
          Delete Post
        </Button>
      </div>
    );
    const blacklistPostmessage = (
      <div>
        <h2>Blacklist Post</h2>
        <p>
          Are you sure you wish to blacklist thispost? This action can be
          undone.
        </p>
        <Button btnType="Cancel" clicked={this.props.goBack}>
          Cancel
        </Button>
        <Button btnType="Danger" clicked={this.props.blacklistPost}>
          Blacklist Post
        </Button>
      </div>
    );

    return (
      <Aux>
        <Modal show={this.props.show}>{deletePostmessage}</Modal>
        <Modal show={this.props.showConfirmMessage}>
          {blacklistPostmessage}
        </Modal>
        <article className={classes.Post}>
          <h1 className={classes.Heading}>{this.props.title}</h1>
          <div className={classes.Author}>
            <p>Post by : {this.props.author}</p>
          </div>
          <div className={classes.Body}>
            {this.props.body.length > 200 ? (
              !this.state.showMore ? (
                <p>
                  {this.props.body.slice(0, 200)}
                  <span className={classes.Read} onClick={this.showMoreHandler}>
                    ...Read More
                  </span>
                </p>
              ) : (
                <p>
                  {this.props.body}
                  <span className={classes.Read} onClick={this.showMoreHandler}>
                    ...Show Less
                  </span>
                </p>
              )
            ) : (
              <p>{this.props.body}</p>
            )}
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className={classes.Properties}>
            <p className={classes.Votes}>
              {like}
              <span className={classes.Spacing}>{this.props.upvotes}</span>
            </p>
            <p className={classes.Votes}>
              {Dislike}
              <span className={classes.Spacing}>{this.props.downvotes}</span>
            </p>
            <p className={classes.Votes}>
              {this.props.userRole === 'admin' ? (
                <Button btnType="Danger" clicked={this.props.blacklistPost}>
                  Blacklist
                </Button>
              ) : null}
            </p>
            <p className={classes.Votes}>
              {this.props.deletePost ? (
                <AiFillDelete
                  onClick={this.props.checkdelete}
                  // selected={this.state.upvoted}
                  cursor="pointer"
                  color="grey"
                  size="26px"
                />
              ) : null}
            </p>
          </div>
        </article>
      </Aux>
    );
  }
}

export default Post;
