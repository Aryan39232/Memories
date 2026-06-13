import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // ── Hero header ──
  hero: {
    borderRadius: 24,
    padding: '32px 36px 26px',
    marginBottom: 28,
    background: 'linear-gradient(135deg, #2D1B69 0%, #4A30A0 35%, #6B4CC8 70%, #8B6FE0 100%)',
    boxShadow: '0 24px 64px rgba(45,27,105,0.40)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -80,
      right: -60,
      width: 320,
      height: 320,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      pointerEvents: 'none',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -100,
      left: '30%',
      width: 240,
      height: 240,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.04)',
      pointerEvents: 'none',
    },
    [theme.breakpoints.down('xs')]: { padding: '24px 20px 20px', borderRadius: 16 },
  },

  heroTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 22,
    [theme.breakpoints.down('xs')]: { flexDirection: 'column', alignItems: 'stretch' },
  },

  greeting: {
    color: '#fff',
    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },
  sub: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: '1.02rem',
    lineHeight: 1.5,
  },

  createBtn: {
    background: '#fff',
    color: '#4A30A0',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    padding: '11px 24px',
    borderRadius: 12,
    fontSize: '0.95rem',
    flexShrink: 0,
    alignSelf: 'flex-start',
    boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
    '&:hover': {
      background: '#F0EAFF',
      boxShadow: '0 6px 24px rgba(0,0,0,0.22)',
    },
    [theme.breakpoints.down('xs')]: { alignSelf: 'stretch' },
  },

  // ── Search inputs (white-on-purple glassmorphism) ──
  searchRow: {
    position: 'relative',
    zIndex: 1,
  },
  searchField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.14)',
      borderRadius: 10,
      color: '#fff',
      backdropFilter: 'blur(4px)',
      '& input': { color: '#fff' },
      '& input::placeholder': { color: 'rgba(255,255,255,0.55)', opacity: 1 },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.55)' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.85)', borderWidth: 2 },
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.28)' },
    '& .MuiInputLabel-outlined': { color: 'rgba(255,255,255,0.72)' },
    '& .MuiInputLabel-outlined.Mui-focused': { color: '#fff' },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': { color: 'rgba(255,255,255,0.9)' },
  },
  chipField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.14)',
      borderRadius: 10,
      backdropFilter: 'blur(4px)',
      '& input': { color: '#fff' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.55)' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.85)', borderWidth: 2 },
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.28)' },
    '& .MuiInputLabel-outlined': { color: 'rgba(255,255,255,0.72)' },
    '& .MuiInputLabel-outlined.Mui-focused': { color: '#fff' },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': { color: 'rgba(255,255,255,0.9)' },
    '& .MuiChip-root': {
      background: 'rgba(255,255,255,0.22)',
      color: '#fff',
      fontWeight: 600,
      borderRadius: 8,
    },
    '& .MuiChip-deleteIcon': { color: 'rgba(255,255,255,0.65)' },
  },

  // ── Form ──
  formWrap: { marginBottom: 28 },

  // ── Pagination ──
  pagination: {
    borderRadius: 18,
    marginTop: 32,
    padding: '14px 20px',
    border: '1px solid rgba(31,27,46,0.07)',
    boxShadow: '0 4px 20px rgba(31,27,46,0.06)',
    display: 'flex',
    justifyContent: 'center',
  },
}));
