import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 24,
    alignItems: 'stretch',
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    minHeight: '40vh',
    color: theme.palette.text.secondary,
  },
  empty: {
    padding: theme.spacing(7, 4),
    textAlign: 'center',
    borderRadius: 18,
    boxShadow: '0 12px 40px rgba(31,27,46,0.08)',
  },
  emptyTitle: { marginBottom: 8 },
  emptyText: { color: theme.palette.text.secondary, maxWidth: 380, margin: '0 auto' },
}));
