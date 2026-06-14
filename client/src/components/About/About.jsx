import React from 'react';
import { Container, Typography, Button, Paper, Grow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import useStyles from './styles';
import { onImgError } from '../../utils/placeholder';

const POLAROIDS = [
  { img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=60', cap: 'Golden hour, again', cls: 'p1' },
  { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60', cap: 'Sunday breakfast', cls: 'p2' },
  { img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&q=60', cap: 'The road trip', cls: 'p3' },
];

const STEPS = [
  { n: '01', t: 'Capture it', d: 'Add a photo, a title and a few words while the moment is still fresh.' },
  { n: '02', t: 'Tag it', d: 'Group memories by people, places or themes so they are easy to find later.' },
  { n: '03', t: 'Share it', d: 'Post it to the wall, where others can like and leave a comment.' },
];

const FEATURES = [
  { icon: <FavoriteBorderIcon />, t: 'Likes', d: 'A small way to say "I was there too" on the memories you love.' },
  { icon: <LabelOutlinedIcon />, t: 'Tags & search', d: 'Find any moment in seconds by tag, keyword or the person who shared it.' },
  { icon: <ChatBubbleOutlineIcon />, t: 'Comments', d: 'Add the story behind the photo and keep the conversation going.' },
];

const SAMPLE_MEMORIES = [
  { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=60', title: 'First Himalayan Trek', name: 'Priya Sharma', likes: 24, tags: ['mountains', 'adventure'] },
  { img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=60', title: 'Monsoon Road Trip', name: 'Rahul Mehta', likes: 18, tags: ['roadtrip', 'rain'] },
  { img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=60', title: 'Festival of Lights', name: 'Ananya Patel', likes: 41, tags: ['diwali', 'family'] },
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=60', title: 'Sunrise at the Beach', name: 'Vikram Nair', likes: 33, tags: ['beach', 'sunrise'] },
];

const WHY_US = [
  { icon: <LockOpenIcon />, t: 'No algorithms', d: 'Your memories appear in chronological order — not ranked by engagement or manipulated by an algorithm.' },
  { icon: <FlashOnIcon />, t: 'Zero noise', d: 'No ads. No sponsored posts. No "suggested" content from strangers. Just the moments you and your people have shared.' },
  { icon: <StarBorderIcon />, t: 'Yours forever', d: 'What you post stays exactly as you left it. No feed, no chasing likes — just a clean wall of real moments.' },
];

const STATS = [
  { icon: <PeopleOutlineIcon />, num: '500+', label: 'Memories shared' },
  { icon: <FavoriteBorderIcon />, num: '2 000+', label: 'Likes given' },
  { icon: <ChatBubbleOutlineIcon />, num: '800+', label: 'Comments written' },
  { icon: <LabelOutlinedIcon />, num: '300+', label: 'Unique tags used' },
];

const About = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Grow in>
      <Container maxWidth="lg" className={classes.wrap}>

        {/* ── Hero ── */}
        <section className={classes.hero}>
          <div className={classes.heroCopy}>
            <span className={classes.eyebrow}>The moments that matter</span>
            <Typography variant="h1" className={classes.title}>
              A warm home for your <span className={classes.accent}>memories</span>.
            </Typography>
            <Typography className={classes.lead}>
              Memories is a simple, shared photo journal. Post a moment, tag it, and let
              the people around you relive it with a like or a comment — no endless feed,
              no noise. Just the things worth keeping.
            </Typography>
            <div className={classes.ctaRow}>
              {!user && (
                <Button component={Link} to="/auth" variant="contained" color="primary" size="large" disableElevation>
                  Start your collection
                </Button>
              )}
              <Button component={Link} to="/posts" variant="outlined" color="primary" size="large">
                Browse memories
              </Button>
            </div>
          </div>

          {/* Animated polaroid stack */}
          <div className={classes.stackWrap}>
            <div className={`${classes.stack} ${classes.stackPlaying}`} aria-hidden="true">
              {POLAROIDS.map((p) => (
                <div key={p.cap} className={`${classes.polaroid} ${classes[p.cls]} ${classes[`${p.cls}Anim`]}`}>
                  <img className={classes.polaroidImg} src={p.img} alt="" onError={onImgError} />
                  <div className={classes.caption}>{p.cap}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className={classes.section}>
          <Typography variant="h4" className={classes.sectionTitle}>How it works</Typography>
          <Typography className={classes.sectionSub}>Three steps, start to shared.</Typography>
          <div className={classes.steps}>
            {STEPS.map((s) => (
              <Paper key={s.n} className={classes.step} elevation={0}>
                <div className={classes.stepNum}>{s.n}</div>
                <Typography variant="h6" className={classes.stepTitle}>{s.t}</Typography>
                <Typography variant="body1" className={classes.stepText}>{s.d}</Typography>
              </Paper>
            ))}
          </div>
        </section>

        {/* ── What you can do ── */}
        <section className={classes.section}>
          <Typography variant="h4" className={classes.sectionTitle}>What you can do</Typography>
          <Typography className={classes.sectionSub}>Small, friendly tools — nothing you have to learn.</Typography>
          <div className={classes.cards}>
            {FEATURES.map((f) => (
              <Paper key={f.t} className={classes.feature} elevation={0}>
                <span className={classes.featIcon}>{f.icon}</span>
                <Typography variant="h6" className={classes.stepTitle}>{f.t}</Typography>
                <Typography variant="body1" className={classes.stepText}>{f.d}</Typography>
              </Paper>
            ))}
          </div>
        </section>

        {/* ── Real memories from the wall ── */}
        <section className={classes.section}>
          <Typography variant="h4" className={classes.sectionTitle}>Memories from the wall</Typography>
          <Typography className={classes.sectionSub}>A glimpse of what people are sharing.</Typography>
          <div className={classes.memoryGrid}>
            {SAMPLE_MEMORIES.map((m) => (
              <div key={m.title} className={classes.memCard}>
                <img src={m.img} alt={m.title} className={classes.memImg} onError={onImgError} />
                <div className={classes.memBody}>
                  <Typography className={classes.memTitle}>{m.title}</Typography>
                  <Typography variant="caption" color="textSecondary">{m.name}</Typography>
                  <div className={classes.memMeta}>
                    <span className={classes.memLikes}><FavoriteBorderIcon style={{ fontSize: 13 }} /> {m.likes}</span>
                    <span>{m.tags.map((t) => `#${t}`).join(' ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Memories ── */}
        <section className={classes.whySection}>
          <Typography variant="h4" className={classes.sectionTitle} style={{ color: '#fff' }}>Why Memories is different</Typography>
          <Typography className={classes.sectionSub} style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 36 }}>
            Social media optimises for attention. We optimise for meaning.
          </Typography>
          <div className={classes.whyGrid}>
            {WHY_US.map((w) => (
              <div key={w.t} className={classes.whyCard}>
                <span className={classes.whyIcon}>{w.icon}</span>
                <Typography variant="h6" className={classes.whyTitle}>{w.t}</Typography>
                <Typography variant="body2" className={classes.whyText}>{w.d}</Typography>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <section className={classes.statsSection}>
          <Typography variant="h4" className={classes.sectionTitle} style={{ textAlign: 'center', marginBottom: 40 }}>
            Numbers that tell a story
          </Typography>
          <div className={classes.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={classes.statCard}>
                <span className={classes.statIcon}>{s.icon}</span>
                <Typography className={classes.statNum}>{s.num}</Typography>
                <Typography variant="body2" color="textSecondary">{s.label}</Typography>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        {!user && (
          <section className={classes.banner}>
            <Typography variant="h4" className={classes.bannerTitle}>Ready to keep your first memory?</Typography>
            <Typography variant="body1" className={classes.bannerText}>It takes about a minute. No card, no catch.</Typography>
            <Button component={Link} to="/auth" variant="contained" size="large" style={{ background: '#fff', color: '#5B3FA8' }}>
              Create an account
            </Button>
          </section>
        )}
      </Container>
    </Grow>
  );
};

export default About;
