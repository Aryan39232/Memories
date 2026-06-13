import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // ── Search + Create bar ──
  searchBar: {
    borderRadius: 18,
    padding: '20px 28px',
    marginBottom: 28,
    background: '#fff',
    boxShadow: '0 2px 16px rgba(31,27,46,0.08)',
    border: '1px solid rgba(31,27,46,0.07)',
    [theme.breakpoints.down('xs')]: { padding: '16px', borderRadius: 14 },
  },

  searchField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.light },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
    },
  },

  chipField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.light },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
    },
    '& .MuiChip-root': {
      background: 'rgba(91,63,168,0.10)',
      color: theme.palette.primary.dark,
      fontWeight: 600,
      borderRadius: 8,
    },
    '& .MuiChip-deleteIcon': { color: theme.palette.primary.main },
  },

  createBtn: {
    fontWeight: 700,
    borderRadius: 10,
    padding: '8px 20px',
    height: 40,
  },

  // ── Dialog ──
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px 12px',
    borderBottom: '1px solid rgba(31,27,46,0.07)',
  },

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
