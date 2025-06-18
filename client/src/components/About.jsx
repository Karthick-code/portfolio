import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
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
    // console.log(users);
  return (
  <Box id="about" sx={{ pt: 10 }}>
    <Box>
      <Typography variant="h4" gutterBottom>About Me</Typography>
    <Typography variant="body1">
      {status === "succeeded" && users.about}
    </Typography>
    </Box>
    <Divider sx={{py:2}} />
    <Box >
      <Typography variant="h5" gutterBottom>Hobbies</Typography>
      <Typography variant="body1">
        {status === "succeeded" && users.hobbies.map((hobby, index) => (
          <li key={index}>
            {hobby}
          </li>
        ))}
      </Typography>
    </Box>
    <Divider sx={{py:2}} />
    <Box>
      <Typography variant="h5" gutterBottom>Skills</Typography>
      <Typography variant="body1">
        {status === "succeeded" && users.skills_technology.map((skill, index) => (
          <li key={index}>
            {skill}
          </li>
        ))}
      </Typography>
      </Box>
  </Box>
);
}

export default About;