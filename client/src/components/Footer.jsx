
import React from 'react';
import { Typography, Link, Box, Dialog } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../slices/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from 'react';
import DialogBox from './dialog/DialogBox';


const Footer = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('privacy');
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (status === "loading") return <CircularProgress />;
  if (status === "failed") return <p>Error: {error}</p>;

  

  const handleOpen = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

    return (
        <>
        <Box
            component="footer"
            sx={{
                width: '100%', // Ensures the footer covers the full width of the container
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                textAlign: 'center',
                padding: '20px', // Increased padding for better coverage
                marginTop: '20px', // Space between content and footer
                boxSizing: 'border-box', // Includes padding and border in the element's total width and height
            }}
        >
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {users.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} {users.name}. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                {/* <Link href="#" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                    Privacy Policy
                </Link>
                <Link href="#" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                    Terms of Service
                </Link> */}
                <Link href="#" onClick={(e) => { e.preventDefault(); handleOpen('privacy'); }} color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                  Privacy Policy
                </Link>{' | '}
                <Link href="#" onClick={(e) => { e.preventDefault(); handleOpen('terms'); }} color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                  Terms of Service
                </Link>{' | '}
                <Link href="#contact" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
                    Contact Us
                </Link>
            </Box>
            
        </Box>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
        <Link href="https://www.facebook.com/login.php/" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <FacebookIcon /> 
        </Link>
        <Link href="https://x.com/login=" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <XIcon/> 
        </Link>
        <Link href="https://www.instagram.com/accounts/login/" target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <InstagramIcon/>
        </Link>
        <Link href={users.linkedIn} target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <LinkedInIcon />
        </Link>
        <Link href={users.github} target="_blank" color="inherit" sx={{ mx: 2, fontSize: '0.875rem' }}>
        <GitHubIcon/>
        </Link>
        </Box>
        
        <DialogBox open={dialogOpen} onClose={() => setDialogOpen(false)} type={dialogType} />
        
        </>
    );
};
export default Footer;