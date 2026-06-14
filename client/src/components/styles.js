import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  ul: {
    justifyContent: 'center',
    gap: 4,
    flexWrap: 'wrap',
    '& .MuiPaginationItem-root': {
      borderRadius: 10,
      fontWeight: 600,
      fontSize: '0.9rem',
      minWidth: 36,
      height: 36,
      border: '1.5px solid rgba(91,63,168,0.20)',
      color: theme.palette.text.secondary,
      transition: 'all 0.15s ease',
      '&:hover': {
        background: 'rgba(91,63,168,0.08)',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      background: theme.palette.primary.main,
      color: '#fff',
      borderColor: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    '& .MuiPaginationItem-ellipsis': {
      border: 'none',
      color: theme.palette.text.secondary,
      fontWeight: 700,
    },
    '& .MuiPaginationItem-firstLast, & .MuiPaginationItem-previousNext': {
      border: '1.5px solid rgba(91,63,168,0.20)',
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },
}));