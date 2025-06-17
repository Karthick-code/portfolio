import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../slices/userSlice';
import CircularProgress from '@mui/material/CircularProgress';

const About = () => {
  
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);
    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>Error: {error}</p>;
    console.log(users);
  return (
  <Box id="about" sx={{ py: 5 }}>
    <Typography variant="h4" gutterBottom>About Me</Typography>
    <Typography variant="body1">
      {status === "succeeded" && users.about}
    </Typography>
  </Box>
);
}

export default About;