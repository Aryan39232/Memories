import React, { useEffect, useState, useCallback } from 'react';
import { Snackbar, LinearProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { onToast, onProgress } from '../../utils/feedback';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const TopProgress = () => {
  const [active, setActive] = useState(false);
  useEffect(() => onProgress(setActive), []);
  if (!active) return null;
  return (
    <LinearProgress
      color="primary"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2000, height: 3 }}
    />
  );
};

// Canonical MUI "consecutive snackbars" pattern. Uses the default (Grow)
// transition and always renders a valid Alert child, so transitions never
// read layout from a null node.
const Toaster = () => {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => onToast((toast) => setSnackPack((prev) => [...prev, toast])), []);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo(snackPack[0]);
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = useCallback((_e, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }, []);

  const handleExited = () => setMessageInfo(undefined);

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={messageInfo ? messageInfo.severity : 'info'}>
        {messageInfo ? messageInfo.message : ''}
      </Alert>
    </Snackbar>
  );
};

const Feedback = () => (
  <>
    <TopProgress />
    <Toaster />
  </>
);

export default Feedback;
