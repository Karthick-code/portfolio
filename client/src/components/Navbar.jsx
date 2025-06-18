import React from "react";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Avatar, Dialog, DialogContent } from '@mui/material';

const Navbar = () => {
  const reloadPage = () => {
    window.location.reload(); // Force page reload
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return(
    <><AppBar position="static" >
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} alignContent={"center"} display="flex" alignItems="center">
        <Avatar 
        src="/assets/Karthick_R.jpg" // Replace with your image path
        alt="Profile" 
        sx={{ cursor: 'pointer', width: 40, height: 40 }} 
        onClick={handleClickOpen} 
      />
        <Button color="inherit" >
          <Typography variant="h7" onClick={reloadPage} component="div" sx={{ flexGrow: 1 }}>
            Portfolio
          </Typography>
        </Button>
      </Box>

      <Box>
        <Button color="inherit" href="#about">
          About
        </Button>
        <Button color="inherit" href="#education">
          Education
        </Button>
        <Button color="inherit" href="#projects">
          Projects
        </Button>
        <Button color="inherit" href="#contact">
          Contact
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
  <Dialog open={open} onClose={handleClose} PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
          },
        }}
        >
        <DialogContent dividers>
          <img 
            src="/public/assets/Karthick_R.jpg" 
            alt="Full Profile" 
            style={{
      maxWidth: '90vw',
      maxHeight: '80vh',
      objectFit: 'contain',
      borderRadius: '10px'
    }}  
          />
        </DialogContent>
      </Dialog>
  </>
  
  
);
}
  

export default Navbar;
