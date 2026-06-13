// Tiny framework-agnostic event bus for toasts + a global request progress bar.
// Callable from non-React modules (e.g. the axios interceptor) and React alike.

let toastListeners = [];
export const notify = (message, severity = 'info') => {
  if (!message) return;
  const toast = { message: String(message), severity, key: Date.now() + Math.random() };
  toastListeners.forEach((l) => l(toast));
};
export const onToast = (listener) => {
  toastListeners.push(listener);
  return () => { toastListeners = toastListeners.filter((l) => l !== listener); };
};

let active = 0;
let progressListeners = [];
const emit = () => progressListeners.forEach((l) => l(active > 0));
export const startRequest = () => { active += 1; emit(); };
export const endRequest = () => { active = Math.max(0, active - 1); emit(); };
export const onProgress = (listener) => {
  progressListeners.push(listener);
  return () => { progressListeners = progressListeners.filter((l) => l !== listener); };
};
