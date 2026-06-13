import React, { useState, useRef } from 'react';
import { Container, Grow, Grid, Paper, TextField, Button, Typography } from '@material-ui/core';
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
  const { posts } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const firstName = user?.result?.name?.split(' ')[0];
  const isSearch = !!searchQuery || !!tags.length;

  const triggerSearch = (q, t) => {
    if (q.trim() || t.length) {
      dispatch(getPostsBySearch({ search: q, tags: t.join(',') }));
      history.push(`/posts/search?searchQuery=${q || 'none'}&tags=${t.join(',')}`);
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

  const handleCreateClick = () => {
    setCurrentId(0);
    setShowForm((prev) => !prev);
  };

  const formOpen = showForm || currentId !== 0;

  let title; let sub;
  if (isSearch) {
    title = searchQuery && searchQuery !== 'none' ? `Results for "${searchQuery}"` : 'Tag results';
  } else if (firstName) {
    title = `Hi, ${firstName} 👋`;
    sub = 'Pick up where you left off, or share a new memory.';
  } else {
    title = 'Moments, kept.';
    sub = 'Browse shared memories. Sign in to start your own collection.';
  }

  return (
    <Grow in>
      <Container maxWidth="xl" disableGutters>

        {/* ── Hero header ── */}
        <div className={classes.hero}>
          {/* Top row: greeting + button */}
          <div className={classes.heroTop}>
            <div>
              <Typography variant="h4" className={classes.greeting}>{title}</Typography>
              {sub && <Typography className={classes.sub}>{sub}</Typography>}
            </div>
            {user?.result ? (
              <Button
                className={classes.createBtn}
                variant="contained"
                startIcon={formOpen ? <CloseIcon /> : <AddIcon />}
                onClick={handleCreateClick}
                disableElevation
              >
                {formOpen ? 'Cancel' : 'Create a memory'}
              </Button>
            ) : (
              <Button className={classes.createBtn} component={Link} to="/auth" variant="contained" disableElevation>
                Get started — it's free
              </Button>
            )}
          </div>

          {/* Bottom row: search inputs */}
          <Grid container spacing={2} className={classes.searchRow}>
            <Grid item xs={12} sm={7}>
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
            <Grid item xs={12} sm={5}>
              <ChipInput
                value={tags}
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                label="Filter by tags  (press Enter to add)"
                variant="outlined"
                fullWidth
                className={classes.chipField}
              />
            </Grid>
          </Grid>
        </div>

        {/* ── Create / Edit form ── */}
        {formOpen && (
          <div className={classes.formWrap}>
            <Form
              currentId={currentId}
              setCurrentId={(id) => {
                // Only close the form automatically when finishing an edit (id goes from non-zero → 0).
                // When creating new (currentId already 0), keep the form open.
                if (id === 0 && currentId !== 0) setShowForm(false);
                setCurrentId(id);
              }}
            />
          </div>
        )}

        {/* ── Posts grid ── */}
        <Posts setCurrentId={(id) => { setCurrentId(id); setShowForm(true); }} />

        {/* ── Pagination ── */}
        {!isSearch && (
          <Paper className={classes.pagination} elevation={0}>
            <Pagination page={page} />
          </Paper>
        )}

      </Container>
    </Grow>
  );
};

export default Home;
