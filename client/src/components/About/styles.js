import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  '@keyframes floatA': {
    '0%, 100%': { transform: 'rotate(-9deg) translate(-80px, -14px)' },
    '50%':       { transform: 'rotate(-9deg) translate(-80px, -28px)' },
  },
  '@keyframes floatB': {
    '0%, 100%': { transform: 'rotate(6deg) translate(88px, 22px)' },
    '50%':       { transform: 'rotate(6deg) translate(88px, 8px)' },
  },
  '@keyframes floatC': {
    '0%, 100%': { transform: 'rotate(-2deg) translate(0, 0)' },
    '50%':       { transform: 'rotate(-2deg) translate(0, -16px)' },
  },

  wrap: { padding: '0 0 80px' },

  // ── Hero ──
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: 72,
    minHeight: 'calc(100vh - 140px)',
    padding: '60px 8px 80px',
    [theme.breakpoints.down('sm')]: { flexDirection: 'column', gap: 48, textAlign: 'center', minHeight: 'auto', padding: '40px 8px 56px' },
  },
  heroCopy: { flex: 1 },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    fontWeight: 700,
    fontSize: 13,
    color: theme.palette.secondary.main,
  },
  title: {
    fontSize: 'clamp(3rem, 7vw, 5.8rem)',
    lineHeight: 1.0,
    fontWeight: 800,
    margin: '20px 0 26px',
  },
  accent: { color: theme.palette.primary.main },
  lead: {
    fontSize: '1.3rem',
    lineHeight: 1.75,
    color: theme.palette.text.secondary,
    maxWidth: 540,
    [theme.breakpoints.down('sm')]: { marginLeft: 'auto', marginRight: 'auto', fontSize: '1.1rem' },
  },
  ctaRow: {
    display: 'flex',
    gap: 16,
    marginTop: 36,
    [theme.breakpoints.down('sm')]: { justifyContent: 'center', flexWrap: 'wrap' },
  },

  // ── Animated polaroid stack ──
  stackWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: { width: '100%' },
  },
  stack: {
    position: 'relative',
    minHeight: 460,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polaroid: {
    position: 'absolute',
    width: 270,
    background: '#fff',
    padding: '14px 14px 0',
    borderRadius: 10,
    boxShadow: '0 24px 64px rgba(31,27,46,0.22)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': { boxShadow: '0 32px 80px rgba(31,27,46,0.32)', zIndex: 10 },
  },
  polaroidImg: { width: '100%', height: 230, objectFit: 'cover', borderRadius: 6, display: 'block' },
  caption: {
    fontFamily: '"Fraunces", Georgia, serif',
    textAlign: 'center',
    padding: '14px 4px 18px',
    color: theme.palette.text.primary,
    fontSize: 15,
  },
  // Static positions
  p1: { transform: 'rotate(-9deg) translate(-80px, -14px)', zIndex: 1 },
  p2: { transform: 'rotate(6deg) translate(88px, 22px)', zIndex: 2 },
  p3: { transform: 'rotate(-2deg)', zIndex: 3 },
  // Animated versions (applied when playing=true)
  p1Anim: { animation: '$floatA 3s ease-in-out infinite' },
  p2Anim: { animation: '$floatB 4s ease-in-out infinite' },
  p3Anim: { animation: '$floatC 3.5s ease-in-out infinite' },
  stackPlaying: {},

  playBtn: {
    marginTop: 20,
    background: 'rgba(79,54,160,0.09)',
    color: theme.palette.primary.main,
    fontWeight: 700,
    borderRadius: 20,
    padding: '6px 18px',
    textTransform: 'none',
    '&:hover': { background: 'rgba(79,54,160,0.16)' },
  },

  // ── Shared section styles ──
  section: { margin: '80px 0' },
  sectionTitle: { marginBottom: 10, fontSize: '2rem', fontWeight: 700 },
  sectionSub: { color: theme.palette.text.secondary, marginBottom: 36, maxWidth: 560, fontSize: '1.05rem' },

  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 28,
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  step: { padding: 36, borderRadius: 22, boxShadow: '0 16px 48px rgba(31,27,46,0.09)' },
  stepNum: { fontFamily: '"Fraunces", Georgia, serif', fontSize: 42, fontWeight: 700, color: theme.palette.primary.light, lineHeight: 1 },
  stepTitle: { margin: '14px 0 8px', fontSize: '1.1rem', fontWeight: 700 },
  stepText: { color: theme.palette.text.secondary, lineHeight: 1.7 },

  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 28,
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  feature: { padding: 36, borderRadius: 22, boxShadow: '0 16px 48px rgba(31,27,46,0.09)' },
  featIcon: { color: theme.palette.secondary.main, fontSize: 36, display: 'block', marginBottom: 12 },

  // ── Sample memories grid ──
  memoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  memCard: {
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(31,27,46,0.10)',
    background: '#fff',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 56px rgba(31,27,46,0.18)' },
  },
  memImg: { width: '100%', height: 160, objectFit: 'cover', display: 'block' },
  memBody: { padding: '14px 16px 16px' },
  memTitle: { fontWeight: 700, fontSize: '0.95rem', marginBottom: 2, lineHeight: 1.3 },
  memMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  memLikes: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    color: '#FF6B6B',
    fontWeight: 600,
    fontSize: 13,
  },

  // ── Why section (dark) ──
  whySection: {
    margin: '80px 0',
    background: 'linear-gradient(135deg, #2D1B69 0%, #4A30A0 50%, #6B4CC8 100%)',
    borderRadius: 28,
    padding: '60px 48px',
    [theme.breakpoints.down('xs')]: { padding: '40px 24px' },
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 28,
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  whyCard: { textAlign: 'center' },
  whyIcon: {
    display: 'inline-flex',
    padding: 14,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    marginBottom: 16,
    '& svg': { fontSize: 28 },
  },
  whyTitle: { color: '#fff', fontWeight: 700, marginBottom: 8 },
  whyText: { color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 },

  // ── Stats section ──
  statsSection: { margin: '80px 0' },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    [theme.breakpoints.down('xs')]: { gridTemplateColumns: '1fr' },
  },
  statCard: {
    textAlign: 'center',
    padding: '32px 16px',
    borderRadius: 22,
    boxShadow: '0 12px 40px rgba(31,27,46,0.09)',
    background: '#fff',
    transition: 'transform 0.2s ease',
    '&:hover': { transform: 'translateY(-4px)' },
  },
  statIcon: {
    display: 'inline-flex',
    color: theme.palette.primary.main,
    marginBottom: 12,
    '& svg': { fontSize: 32 },
  },
  statNum: {
    fontFamily: '"Fraunces", Georgia, serif',
    fontSize: '2.4rem',
    fontWeight: 800,
    color: theme.palette.primary.dark,
    lineHeight: 1,
    marginBottom: 8,
  },

  // ── Final CTA banner ──
  banner: {
    marginTop: 80,
    padding: '72px 48px',
    borderRadius: 28,
    textAlign: 'center',
    color: '#fff',
    background: 'linear-gradient(135deg, #5B3FA8 0%, #7C5FD6 50%, #FF6B6B 130%)',
    boxShadow: '0 24px 72px rgba(91,63,168,0.38)',
  },
  bannerTitle: { color: '#fff', marginBottom: 14, fontSize: '2.2rem', fontWeight: 800 },
  bannerText: { color: 'rgba(255,255,255,0.9)', marginBottom: 32, fontSize: '1.15rem' },
}));
