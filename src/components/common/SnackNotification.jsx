import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackNotification({snack, closeSnack}) {

  return (
    <Snackbar open={snack.isOpen} autoHideDuration={3000} onClose={closeSnack}>
      <Alert onClose={closeSnack} severity={snack.severity} sx={{ width: '100%' }}>
        {snack.message}
      </Alert>
    </Snackbar>
  );
}