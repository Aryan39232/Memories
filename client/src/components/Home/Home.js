import React, { useState, useRef, useEffect } from 'react';
import { Container, Grow, Grid, Paper, TextField, Button, Typography, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import Pagination from '../pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const searchTimer = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { numberOfPages } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const isSearch = !!searchQuery || !!tags.length;

  // Single source of truth: dispatch whenever the URL's search params change.
  // This covers: user typing, chip add/delete, "See all" navigation, search pagination,
  // and direct URL entry — all without double-dispatching.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sq = params.get('searchQuery');
    const t = params.get('tags');
    const p = Number(params.get('page')) || 1;
    if (sq || t) {
      dispatch(getPostsBySearch({ search: sq || 'none', tags: t || '', page: p }));
    }
  }, [location.search, dispatch]);

  const triggerSearch = (q, t, p = 1) => {
    if (q.trim() || t.length) {
      history.push(`/posts/search?searchQuery=${q || 'none'}&tags=${t.join(',')}&page=${p}`);
    } else {
      history.push('/posts');
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => triggerSearch(val, tags), 600);
  };

  const handleAddChip = (tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    triggerSearch(search, newTags);
  };

  const handleDeleteChip = (chipToDelete) => {
    const newTags = tags.filter((t) => t !== chipToDelete);
    setTags(newTags);
    triggerSearch(search, newTags);
  };

  const handleOpenCreate = () => {
    setCurrentId(0);
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setCurrentId(0);
  };

  const modalOpen = showForm || currentId !== 0;

  return (
    <Grow in>
      <Container maxWidth="xl" disableGutters>

        {/* ── Search + Create bar ── */}
        <div className={classes.searchBar}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5} md={5}>
              <TextField
                name="search"
                variant="outlined"
                label="Search memories…"
                fullWidth
                size="small"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) { clearTimeout(searchTimer.current); triggerSearch(search, tags); }
                }}
                className={classes.searchField}
                InputProps={{ style: { borderRadius: 10 } }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <ChipInput
                value={tags}
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                label="Filter by tags  (press Enter)"
                variant="outlined"
                fullWidth
                className={classes.chipField}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              {user?.result ? (
                <Button
                  className={classes.createBtn}
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreate}
                  fullWidth
                  disableElevation
                >
                  Create
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  className={classes.createBtn}
                >
                  Sign in
                </Button>
              )}
            </Grid>
          </Grid>
        </div>

        {/* ── Create / Edit modal ── */}
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{ style: { borderRadius: 18 } }}
        >
          <DialogTitle disableTypography className={classes.dialogTitle}>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              {currentId ? 'Edit memory' : 'Create a memory'}
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ paddingBottom: 24 }}>
            <Form
              currentId={currentId}
              embedded
              setCurrentId={(id) => {
                if (id === 0) handleCloseModal();
                else setCurrentId(id);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* ── Posts grid ── */}
        <Posts setCurrentId={(id) => { setCurrentId(id); setShowForm(true); }} />

        {/* ── Pagination ── */}
        {!isSearch ? (
          <Paper className={classes.pagination} elevation={0}>
            <Pagination page={page} />
          </Paper>
        ) : numberOfPages > 1 && (
          <Paper className={classes.pagination} elevation={0}>
            <Pagination
              page={Number(query.get('page')) || 1}
              buildUrl={(p) => `/posts/search?searchQuery=${query.get('searchQuery') || 'none'}&tags=${query.get('tags') || ''}&page=${p}`}
            />
          </Paper>
        )}

      </Container>
    </Grow>
  );
};

export default Home;
