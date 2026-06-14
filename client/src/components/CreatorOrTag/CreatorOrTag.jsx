import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/post';
import Paginate from '../pagination';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading, numberOfPages } = useSelector((state) => state.posts);
  const location = useLocation();
  const isTag = location.pathname.startsWith('/tags');
  const page = Number(new URLSearchParams(location.search).get('page')) || 1;

  useEffect(() => {
    if (isTag) {
      dispatch(getPostsBySearch({ tags: name, page }));
    } else {
      dispatch(getPostsByCreator(name, page));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, isTag, page]);

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
        <>
          <Grid container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
          {numberOfPages > 1 && (
            <Paper style={{ borderRadius: 18, padding: '20px 0', marginTop: 32 }} elevation={0}>
              <Paginate
                page={page}
                buildUrl={(p) => `${location.pathname}?page=${p}`}
              />
            </Paper>
          )}
        </>
      )}
    </div>
  );
};

export default CreatorOrTag;
