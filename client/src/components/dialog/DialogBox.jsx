// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function ScrollDialog() {
//   const [open, setOpen] = React.useState(false);
//   const [scroll, setScroll] = React.useState('paper');

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = (x) => {
//     setOpen(false);
//   };

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   return (
//     <React.Fragment>
//       {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
//       <Button onClick={handleClickOpen('body')}>scroll=body</Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         scroll={scroll}
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//       >
//         <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
//         <DialogContent dividers={scroll === 'paper'}>
//           <DialogContentText
//             id="scroll-dialog-description"
//             ref={descriptionElementRef}
//             tabIndex={-1}
//           >
//             {x}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }



import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DialogBox = ({ open, onClose, type }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (open) {
      const file = type === 'privacy' ? '/content/privacy.txt' : '/content/TermsofServices.txt';
      fetch(file)
        .then((res) => res.text())
        .then((text) => setContent(text));
    }
  }, [type, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</DialogTitle>
      <DialogContent dividers>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;

