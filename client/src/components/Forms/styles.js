import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: { '& .MuiTextField-root': { margin: theme.spacing(1) } },
  paper: {
    padding: theme.spacing(2.5),
    borderRadius: 18,
    boxShadow: '0 12px 40px rgba(31,27,46,0.08)',
  },
  heading: { marginBottom: theme.spacing(1) },
  form: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' },
  fileInput: { width: '97%', margin: '10px 0' },
  buttonSubmit: { marginBottom: 10, height: 46 },
}));
