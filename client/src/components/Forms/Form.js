import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const [loading, setLoading] = useState(false);
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  // Only populate form data when a post is loaded for editing.
  // Do NOT call clear() on mount — that was causing the form to close immediately.
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentId === 0) {
        await dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      } else {
        await dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      }
      clear();
    } catch {
      // Error toast is handled globally; keep the form open so the user can retry.
    } finally {
      setLoading(false);
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Sign in to create your own memories and like the ones you love.
        </Typography>
      </Paper>
    );
  }

  // Use functional updates to avoid stale-closure issues with rapid tag changes.
  const handleAddChip = (tag) => setPostData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  const handleDeleteChip = (chipToDelete) => setPostData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== chipToDelete) }));

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6" className={classes.heading}>
          {currentId ? `Editing "${post?.title}"` : 'Create a memory'}
        </Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData((prev) => ({ ...prev, message: e.target.value }))} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags (press Enter to add)"
            fullWidth
            value={postData.tags}
            onAdd={handleAddChip}
            onDelete={handleDeleteChip}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData((prev) => ({ ...prev, selectedFile: base64 }))} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth disabled={loading} disableElevation>
          {loading ? <CircularProgress size={24} color="inherit" /> : (currentId ? 'Save changes' : 'Share memory')}
        </Button>
        <Button variant="text" color="secondary" size="small" onClick={clear} fullWidth disabled={loading}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
