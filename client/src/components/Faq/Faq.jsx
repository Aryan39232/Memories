import React, { useState } from 'react';
import {
  Container, Typography, Accordion, AccordionSummary, AccordionDetails, Grow, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const FAQS = [
  {
    q: 'Do I need an account to look around?',
    a: 'No. You can browse every memory, open a post and read comments without signing in. An account is only needed to post your own memories, like, or comment.',
  },
  {
    q: 'How do I create a memory?',
    a: 'Sign in, then use the "Create a memory" panel on the Memories page. Add a title, a short message, any tags, and an image. Press "Share memory" and it appears on the wall.',
  },
  {
    q: 'What are tags for?',
    a: 'Tags group related memories together — a place, a person, a trip. Click any tag to see everything that shares it, or use the search box to combine tags and keywords.',
  },
  {
    q: 'Can I edit or delete a memory later?',
    a: 'Yes, on your own posts. Open the menu on a card you created to edit it, or use the delete button to remove it. You can only change memories you posted.',
  },
  {
    q: 'Who can see what I post?',
    a: 'Memories posted to the wall are visible to anyone using the site. Treat it as a shared, public space rather than a private diary.',
  },
  {
    q: 'Is there a mobile version?',
    a: 'The site is fully responsive, so it adapts to phones and tablets. Open it in any modern browser — there is nothing to install.',
  },
];

const Faq = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState('q0');
  const user = JSON.parse(localStorage.getItem('profile'));

  const handle = (panel) => (_e, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <Grow in>
      <Container className={classes.wrap}>
        <div className={classes.header}>
          <span className={classes.eyebrow}>Good to know</span>
          <Typography variant="h2" className={classes.title}>Questions, answered</Typography>
          <Typography variant="body1" className={classes.sub}>Everything you might wonder before you start.</Typography>
        </div>

        {FAQS.map((item, i) => (
          <Accordion key={i} className={classes.panel} expanded={expanded === `q${i}`} onChange={handle(`q${i}`)} elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.question}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.answer}>{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <div className={classes.footer}>
          <Typography variant="h6" gutterBottom>Still curious?</Typography>
          <Typography variant="body1" className={classes.sub} style={{ marginBottom: 18 }}>
            The best way to understand Memories is to make one.
          </Typography>
          {user ? (
            <Button component={Link} to="/posts" variant="contained" color="primary" disableElevation>Go to Memories</Button>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary" disableElevation>Get started</Button>
          )}
        </div>
      </Container>
    </Grow>
  );
};

export default Faq;
