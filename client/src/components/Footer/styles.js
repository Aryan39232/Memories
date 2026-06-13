import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  footer: {
    marginTop: 56,
    marginBottom: 24,
    textAlign: 'center',
    padding: '20px 16px',
    borderTop: '1px solid rgba(31,27,46,0.07)',
  },
  copy: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
}));
