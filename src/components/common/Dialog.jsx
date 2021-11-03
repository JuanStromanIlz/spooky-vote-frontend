import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({dialog, closeDialog, action}) {

  return (
    <div>
      <Dialog
        open={dialog.isOpen}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>¿Queres votar a {dialog.name}?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={() => action(dialog._id)} color='secondary'>Votar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}