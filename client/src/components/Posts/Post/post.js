import React, { useState } from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

import { FALLBACK_IMG, onImgError } from '../../../utils/placeholder';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);
  const isOwner = user?.result?.googleId === post?.creator || user?.result?._id === post?.creator;

  const handleLike = async () => {
    const previous = likes;
    setLikes(hasLikedPost ? likes.filter((id) => id !== userId) : [...likes, userId]);
    try {
      await dispatch(likePost(post._id));
    } catch {
      setLikes(previous);
    }
  };

  const handleDeleteConfirmed = async () => {
    setConfirmOpen(false);
    setDeleting(true);
    try {
      await dispatch(deletePost(post._id));
    } catch {
      // Error toast handled globally.
    } finally {
      setDeleting(false);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost
        ? (<><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>)
        : (<><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>);
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <>
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase component="span" className={classes.cardAction} onClick={() => history.push(`/posts/${post._id}`)}>
          <CardMedia component="img" className={classes.media} src={post.selectedFile || FALLBACK_IMG} alt={post.title} onError={onImgError} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>

          {isOwner && (
            <div className={classes.editBadge}>
              <Button
                className={classes.editBtn}
                size="small"
                startIcon={<EditOutlinedIcon fontSize="small" />}
                onClick={(e) => { e.stopPropagation(); setCurrentId(post._id); }}
              >
                Edit
              </Button>
            </div>
          )}

          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message.split(' ').splice(0, 20).join(' ')}…
            </Typography>
          </CardContent>
        </ButtonBase>

        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
            <Likes />
          </Button>
          {isOwner && (
            <Button
              size="small"
              color="secondary"
              disabled={deleting}
              onClick={() => setConfirmOpen(true)}
            >
              {deleting
                ? <CircularProgress size={18} color="inherit" />
                : <><DeleteIcon fontSize="small" />&nbsp;Delete</>}
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete this memory?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "<strong>{post.title}</strong>" will be permanently removed. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '8px 20px 16px' }}>
          <Button onClick={() => setConfirmOpen(false)} color="default">Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="secondary" variant="contained" disableElevation autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
