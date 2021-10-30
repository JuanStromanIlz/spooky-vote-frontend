import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackNotification({open, closeSnack, info}) {

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={closeSnack}>
      <Alert onClose={closeSnack} severity={info.severity} sx={{ width: '100%' }}>
        {info.message}
      </Alert>
    </Snackbar>
  );
}