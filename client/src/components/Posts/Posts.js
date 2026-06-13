import React from 'react';
import { Paper, Typography, Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';

import Post from './Post/post';
import useStyles from './styles';

const SkeletonCard = () => (
  <Card style={{ borderRadius: 18, overflow: 'hidden' }} elevation={3}>
    <Skeleton variant="rect" height={170} />
    <div style={{ padding: 16 }}>
      <Skeleton width="55%" height={28} />
      <Skeleton width="90%" />
      <Skeleton width="80%" />
      <div style={{ marginTop: 12 }}><Skeleton width="30%" height={30} /></div>
    </div>
  </Card>
);

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.grid} aria-busy="true" aria-label="Loading memories">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <Paper className={classes.empty} elevation={6}>
        <Typography variant="h5" className={classes.emptyTitle}>No memories yet</Typography>
        <Typography variant="body1" className={classes.emptyText}>
          Nothing here so far. Share the first moment, or try a different search.
        </Typography>
      </Paper>
    );
  }

  return (
    <div className={classes.grid}>
      {posts.map((post) => (
        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Posts;
