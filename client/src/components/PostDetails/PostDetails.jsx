import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Chip, Avatar } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';

import { FALLBACK_IMG, onImgError } from '../../utils/placeholder';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => { dispatch(getPost(id)); }, [id, dispatch]);

  useEffect(() => {
    if (post) dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
  }, [post, dispatch]);

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  if (!post) {
    return (
      <div className="mem-rise">
        <Link to="/posts" className={classes.backLink}>
          <ArrowBackIcon fontSize="small" /> All memories
        </Link>
        <Paper style={{ padding: '48px 28px', borderRadius: 18, textAlign: 'center' }} elevation={6}>
          <Typography variant="h5" gutterBottom>Memory not found</Typography>
          <Typography variant="body1" color="textSecondary">
            This memory may have been removed, or the link is incorrect.
          </Typography>
        </Paper>
      </div>
    );
  }

  const allRecommended = posts.filter(({ _id }) => _id !== post._id);
  const recommendedPosts = allRecommended.slice(0, 6);
  const likeCount = post.likes?.length || 0;

  return (
    <div className="mem-rise">
      <Link to="/posts" className={classes.backLink}>
        <ArrowBackIcon fontSize="small" /> All memories
      </Link>

      <Paper style={{ padding: '28px', borderRadius: '18px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h2" component="h1" className={classes.title}>{post.title}</Typography>

            {!!post.tags?.length && (
              <div className={classes.tagRow}>
                {post.tags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} className={classes.tag} component={Link} to={`/tags/${tag}`} clickable size="small" />
                ))}
              </div>
            )}

            <div className={classes.metaRow}>
              <Avatar className={classes.avatar}>{post.name?.charAt(0)}</Avatar>
              <div>
                <Typography className={classes.metaName}>
                  <Link to={`/creators/${post.name}`} className={classes.metaNameLink}>{post.name}</Link>
                </Typography>
                <Typography className={classes.metaDate}>{moment(post.createdAt).format('MMM D, YYYY')} · {moment(post.createdAt).fromNow()}</Typography>
              </div>
              <Chip className={classes.likeChip} icon={<FavoriteIcon style={{ color: '#FF6B6B' }} />} label={`${likeCount} ${likeCount === 1 ? 'like' : 'likes'}`} size="small" />
            </div>

            <Divider style={{ margin: '18px 0 22px' }} />
            <Typography variant="body1" className={classes.message}>{post.message}</Typography>

            <div className={classes.commentsBlock}>
              <CommentSection post={post} />
            </div>
          </div>

          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || FALLBACK_IMG} alt={post.title} onError={onImgError} />
          </div>
        </div>

        {!!recommendedPosts.length && (
          <div className={classes.recommended}>
            <div className={classes.recommendedHeader}>
              <Typography variant="h6" className={classes.recommendedTitle}>You might also like</Typography>
              {allRecommended.length > 6 && (
                <Link
                  to={post.tags?.length ? `/posts/search?searchQuery=none&tags=${post.tags.join(',')}` : '/posts'}
                  className={classes.seeAllLink}
                >
                  See all
                </Link>
              )}
            </div>
            <Divider style={{ marginBottom: 20 }} />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({ title, name, likes, selectedFile, _id }) => (
                <div className={classes.recCard} onClick={() => openPost(_id)} key={_id}>
                  <img className={classes.recImg} src={selectedFile || FALLBACK_IMG} alt={title} onError={onImgError} />
                  <div className={classes.recContent}>
                    <Typography className={classes.recTitle} variant="subtitle2">{title}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {name} · {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Post;
