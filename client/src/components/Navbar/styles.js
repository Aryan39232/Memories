import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 18,
    margin: '24px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 28px',
    background: 'rgba(255,255,255,0.78)',
    backdropFilter: 'saturate(160%) blur(12px)',
    border: '1px solid rgba(31,27,46,0.06)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 12,
      padding: '16px',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    gap: 10,
  },
  wordmark: {
    fontFamily: '"Fraunces", Georgia, serif',
    fontWeight: 700,
    fontSize: '1.6rem',
    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    [theme.breakpoints.down('xs')]: { display: 'none' },
  },
  navLink: {
    color: theme.palette.text.secondary,
    textTransform: 'none',
    fontWeight: 600,
    padding: '6px 14px',
    borderRadius: 10,
  },
  navLinkActive: {
    color: theme.palette.primary.main,
    background: 'rgba(91,63,168,0.10)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    [theme.breakpoints.down('sm')]: { justifyContent: 'center' },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': { color: theme.palette.primary.main },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: theme.palette.primary.main,
    fontWeight: 700,
  },
}));
