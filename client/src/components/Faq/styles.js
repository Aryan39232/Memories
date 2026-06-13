import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  wrap: { padding: '24px 0 64px', maxWidth: 820, margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: 40 },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    fontWeight: 700,
    fontSize: 12,
    color: theme.palette.secondary.main,
  },
  title: { fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '12px 0 10px' },
  sub: { color: theme.palette.text.secondary },
  panel: {
    borderRadius: '14px !important',
    marginBottom: 12,
    boxShadow: '0 8px 28px rgba(31,27,46,0.07)',
    '&:before': { display: 'none' },
  },
  question: { fontWeight: 600 },
  answer: { color: theme.palette.text.secondary, lineHeight: 1.65 },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    padding: 28,
    borderRadius: 18,
    background: 'rgba(91,63,168,0.06)',
  },
}));
