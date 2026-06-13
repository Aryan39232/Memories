import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const location = useLocation();
  const isTag = location.pathname.startsWith('/tags');

  useEffect(() => {
    if (isTag) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, [name]);

  return (
    <div className="mem-rise" style={{ padding: '8px 0 40px' }}>
      <Typography variant="overline" color="textSecondary">{isTag ? 'Tag' : 'Creator'}</Typography>
      <Typography variant="h2">{isTag ? `#${name}` : name}</Typography>
      <Divider style={{ margin: '20px 0 40px 0' }} />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <CircularProgress size="3em" />
        </div>
      ) : !posts.length ? (
        <Paper style={{ padding: '40px', textAlign: 'center', borderRadius: 18 }} elevation={6}>
          <Typography variant="h5" gutterBottom>Nothing here yet</Typography>
          <Typography variant="body1" color="textSecondary">No memories match this {isTag ? 'tag' : 'creator'} so far.</Typography>
        </Paper>
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
