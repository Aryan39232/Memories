import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Avatar, Grow, Divider, Chip, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';

import { getPostsByCreator } from '../../actions/posts';
import Post from '../Posts/Post/post';
import Form from '../Forms/Form';
import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [currentId, setCurrentId] = useState(0);

  const handleCloseModal = () => setCurrentId(0);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
  };

  useEffect(() => {
    if (!user?.result) {
      history.push('/auth');
      return;
    }
    dispatch(getPostsByCreator(user.result.name));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Button
            className={classes.logoutBtn}
            variant="outlined"
            startIcon={<ExitToAppIcon />}
            onClick={logout}
          >
            Sign out
          </Button>
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
            {posts.map((post) => <Post key={post._id} post={post} setCurrentId={setCurrentId} />)}
          </div>
        ) : (
          <Paper className={classes.empty} elevation={6}>
            <Typography variant="h6" gutterBottom>No memories yet</Typography>
            <Typography variant="body1" color="textSecondary">
              The moments you share will collect here. Head to the wall to add your first.
            </Typography>
          </Paper>
        )}
        <Dialog
          open={currentId !== 0}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{ style: { borderRadius: 18 } }}
        >
          <DialogTitle disableTypography style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 0' }}>
            <Typography variant="h6" style={{ fontWeight: 700 }}>Edit memory</Typography>
            <IconButton size="small" onClick={handleCloseModal}><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent style={{ paddingBottom: 24 }}>
            <Form
              currentId={currentId}
              embedded
              setCurrentId={(id) => { if (id === 0) handleCloseModal(); else setCurrentId(id); }}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Grow>
  );
};

export default Profile;
