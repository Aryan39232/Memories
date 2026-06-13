import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [posting, setPosting] = useState(false);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    setPosting(true);
    try {
      const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
      setComment('');
      setComments(newComments);
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      // Error toast is handled globally.
    } finally {
      setPosting(false);
    }
  };

  return (
    <div>
      <Typography variant="h6" className={classes.commentsHeading}>
        Comments{comments?.length ? ` (${comments.length})` : ''}
      </Typography>

      {/* ── Comment list ── */}
      <div className={classes.commentsList}>
        {comments?.length ? comments.map((c, i) => {
          const author = c.split(': ')[0];
          const text = c.split(': ').slice(1).join(': ');
          return (
            <div key={i} className={classes.commentItem}>
              <div className={classes.commentAvatar}>{author?.charAt(0)}</div>
              <div className={classes.commentBody}>
                <Typography className={classes.commentAuthor}>{author}</Typography>
                <Typography variant="body2" className={classes.commentText}>{text}</Typography>
              </div>
            </div>
          );
        }) : (
          <Typography variant="body2" className={classes.emptyComments}>
            No comments yet — be the first to add the story behind this moment.
          </Typography>
        )}
        <div ref={commentsRef} />
      </div>

      {/* ── Write a comment ── */}
      {user?.result?.name && (
        <div className={classes.writeComment}>
          <div className={classes.commentAvatar}>{user.result.name?.charAt(0)}</div>
          <div style={{ flex: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add a comment…"
              multiline
              rows={3}
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: 8 }}
              fullWidth
              disabled={!comment.length || posting}
              color="primary"
              variant="contained"
              onClick={handleComment}
              disableElevation
              size="small"
            >
              {posting ? <CircularProgress size={20} color="inherit" /> : 'Post comment'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
