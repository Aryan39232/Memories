const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <rect width="400" height="300" fill="#EBEBEB"/>
  <rect x="150" y="98" width="100" height="82" rx="6" fill="#D2D2D2"/>
  <circle cx="178" cy="124" r="12" fill="#ABABAB"/>
  <polygon points="150,180 184,138 208,160 230,130 250,180" fill="#BEBEBE"/>
  <line x1="150" y1="196" x2="250" y2="196" stroke="#CCCCCC" stroke-width="3" stroke-linecap="round"/>
  <line x1="168" y1="210" x2="232" y2="210" stroke="#D5D5D5" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

export const FALLBACK_IMG = `data:image/svg+xml,${encodeURIComponent(svg)}`;
export const onImgError = (e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; };
