import { createTheme } from '@material-ui/core/styles';

// Warm photo-album identity for "Memories".
const theme = createTheme({
  palette: {
    primary: { main: '#5B3FA8', light: '#7C5FD6', dark: '#3F2A7A', contrastText: '#FFFFFF' },
    secondary: { main: '#FF6B6B', light: '#FF8E8E', dark: '#D94F4F', contrastText: '#FFFFFF' },
    background: { default: '#FBF7F0', paper: '#FFFFFF' },
    text: { primary: '#1F1B2E', secondary: '#6E6880' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  overrides: {
    MuiButton: {
      root: { borderRadius: 12, textTransform: 'none', paddingTop: 8, paddingBottom: 8 },
      contained: { boxShadow: '0 6px 18px rgba(91,63,168,0.18)' },
    },
    MuiPaper: { rounded: { borderRadius: 18 } },
    MuiAppBar: { root: { boxShadow: '0 8px 30px rgba(31,27,46,0.08)' } },
    MuiOutlinedInput: { root: { borderRadius: 12 } },
  },
});

export default theme;
