import React, { useContext } from "react";
import classes from "./Post.css";
import Modal from "./../UI/Modal/Modal";
import Aux from "./../../hoc/Auxil/Auxil";
import Button from "./../UI/Button/Button";
// import UserContext from "./../../hoc/Context/UserContext";
// import { AiFillLike } from "react-icons/ai";
import { AiFillLike, AiFillDislike, AiFillDelete } from "react-icons/ai";
const Post = (props) => {
  // const value = useContext(UserContext);
  // let dropdown;
  // if (props.userRole === "admin") {
  //   dropdown = (
  //     <span>
  //       <Button btnType="Danger" clicked={props.blacklistPost}>
  //         Blacklist
  //       </Button>
  //     </span>
  //   );
  // }
  const deletePostmessage = (
    <div>
      <h2>Delete Post</h2>
      <p>
        Are you sure you wish to delete this answer? This action can be undone.
      </p>
      <Button btnType="Cancel" clicked={props.goBack}>
        Cancel
      </Button>
      <Button btnType="Danger" clicked={props.deletePost}>
        Delete Post
      </Button>
    </div>
  );
  const blacklistPostmessage = (
    <div>
      <h2>Blacklist Post</h2>
      <p>
        Are you sure you wish to blacklist thispost? This action can be undone.
      </p>
      <Button btnType="Cancel" clicked={props.goBack}>
        Cancel
      </Button>
      <Button btnType="Danger" clicked={props.blacklistPost}>
        Blacklist Post
      </Button>
    </div>
  );

  return (
    <Aux>
      <Modal show={props.show}>{deletePostmessage}</Modal>
      <Modal show={props.showConfirmMessage}>{blacklistPostmessage}</Modal>
      <article className={classes.Post}>
        <h1 className={classes.Heading}>{props.title}</h1>
        <div className={classes.Author}>
          <p>Post by : {props.author}</p>
        </div>
        <div className={classes.Body}>
          {props.body.length > 200 ? (
            <p>
              {props.body.slice(0, 200)}
              <span className={classes.Read} onClick={props.clicked}>
                ...Read More
              </span>
            </p>
          ) : (
            <p>{props.body}</p>
          )}
        </div>
        <div className={classes.Properties}>
          <p className={classes.Votes}>
            <AiFillLike
              // onClick={upvote}
              // selected={this.state.upvoted}
              color="rgb(13, 188, 247)"
              size="23px"
            />
            <br></br>
            {props.upvotes}
          </p>
          <p className={classes.Votes}>
            <AiFillDislike
              // onClick={downvote}
              // selected={this.state.upvoted}
              color="#fb655a"
              size="25px"
            />
            <br></br>
            {props.downvotes}
          </p>
          <p className={classes.Votes}>
            {props.userRole === "admin" ? (
              <Button btnType="Danger" clicked={props.blacklistPost}>
                Blacklist
              </Button>
            ) : null}
          </p>
          <p className={classes.Votes}>
            {props.deletePost ? (
              <AiFillDelete
                onClick={props.checkdelete}
                // selected={this.state.upvoted}
                cursor="pointer"
                color="grey"
                size="23px"
              />
            ) : null}
          </p>
        </div>
      </article>
    </Aux>
  );
};

export default Post;
