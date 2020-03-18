import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// dayjs for time formatting
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux Stuff
import { connect } from "react-redux";

// Custom Components
import CustomButton from "../../utils/CustomButton";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

export class Post extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile Image"
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>

          {deleteButton}

          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="body1">{body}</Typography>

          <LikeButton postId={postId} />

          <span>
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </span>

          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>

          <span>
            {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
          </span>

          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
