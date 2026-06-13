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
      <Typography variant="h6" className={classes.commentsHeading}>Comments</Typography>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {comments?.length ? comments.map((c, i) => {
            const author = c.split(': ')[0];
            const text = c.split(': ').slice(1).join(': ');
            return (
              <div key={i} className={classes.commentItem}>
                <Typography variant="subtitle1">
                  <span className={classes.commentAuthor}>{author}</span>
                  {text ? `  ${text}` : ''}
                </Typography>
              </div>
            );
          }) : (
            <Typography variant="body2" className={classes.emptyComments}>
              No comments yet — be the first to add the story behind this moment.
            </Typography>
          )}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length || posting} color="primary" variant="contained" onClick={handleComment} disableElevation>
              {posting ? <CircularProgress size={22} color="inherit" /> : 'Comment'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
