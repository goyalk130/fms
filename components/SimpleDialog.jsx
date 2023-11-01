import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog({children,...props}) {
  const { onClose, selectedValue, open,title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm" sx={{width:"100%"}}>
      <DialogTitle>{title}</DialogTitle>
     {children}
    </Dialog>
  );
}




