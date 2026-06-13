import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    borderRadius: 22,
    boxShadow: '0 20px 60px rgba(31,27,46,0.12)',
  },
  root: { '& .MuiTextField-root': { margin: theme.spacing(1) } },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 56,
    height: 56,
  },
  subtitle: { color: theme.palette.text.secondary, marginTop: 4, textAlign: 'center' },
  form: { width: '100%', marginTop: theme.spacing(3) },
  submit: { margin: theme.spacing(3, 0, 2), height: 46 },
  divider: { margin: theme.spacing(1, 0, 2) },
  googleWrap: { display: 'flex', justifyContent: 'center', marginBottom: theme.spacing(2) },
}));
