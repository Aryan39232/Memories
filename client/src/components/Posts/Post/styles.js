import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
    display: 'block',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 18,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 52px rgba(31,27,46,0.20)',
    },
  },
  overlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    color: '#fff',
    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
  },

  // Edit pill button — top-right corner of the image
  editBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  editBtn: {
    background: 'rgba(255,255,255,0.88)',
    color: '#4A30A0',
    fontWeight: 700,
    fontSize: 12,
    borderRadius: 20,
    padding: '4px 12px',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
    textTransform: 'none',
    '&:hover': {
      background: '#fff',
      boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
    },
  },

  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px 20px 0',
  },
  title: {
    padding: '0 16px',
    fontFamily: '"Fraunces", Georgia, serif',
  },
  cardActions: {
    padding: '0 16px 12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    width: '100%',
  },
});
