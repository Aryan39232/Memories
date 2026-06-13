import React, { useEffect } from 'react';
import { Container, Paper, Typography, Avatar, Grow, Divider, Chip } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getPostsByCreator } from '../../actions/posts';
import Post from '../Posts/Post/post';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (!user?.result) {
      history.push('/auth');
      return;
    }
    dispatch(getPostsByCreator(user.result.name));
  }, []);

  if (!user?.result) return null;

  const { name, email, imageUrl } = user.result;
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);

  return (
    <Grow in>
      <Container maxWidth="xl" disableGutters>
        <Paper className={classes.header} elevation={0}>
          <Avatar className={classes.avatar} src={imageUrl}>{name?.charAt(0)}</Avatar>
          <div className={classes.headerText}>
            <Typography variant="overline" className={classes.eyebrow}>Your profile</Typography>
            <Typography variant="h4" className={classes.name}>{name}</Typography>
            {email && <Typography variant="body2" className={classes.email}>{email}</Typography>}
            <div className={classes.chips}>
              <Chip className={classes.chip} label={`${posts.length} ${posts.length === 1 ? 'memory' : 'memories'}`} />
              <Chip className={classes.chip} label={`${totalLikes} ${totalLikes === 1 ? 'like' : 'likes'} received`} />
            </div>
          </div>
        </Paper>

        <Typography variant="h5" className={classes.sectionTitle}>My memories</Typography>
        <Divider className={classes.divider} />

        {isLoading ? (
          <div className={classes.grid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rect" height={300} style={{ borderRadius: 18 }} />
            ))}
          </div>
        ) : posts.length ? (
          <div className={classes.grid}>
            {posts.map((post) => <Post key={post._id} post={post} />)}
          </div>
        ) : (
          <Paper className={classes.empty} elevation={6}>
            <Typography variant="h6" gutterBottom>No memories yet</Typography>
            <Typography variant="body1" color="textSecondary">
              The moments you share will collect here. Head to the wall to add your first.
            </Typography>
          </Paper>
        )}
      </Container>
    </Grow>
  );
};

export default Profile;
