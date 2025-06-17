import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../slices/userSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, Button, Card ,CardMedia} from "@mui/material";

const Hero = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);
    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>Error: {error}</p>;
    // console.log(users);
    
  return (
    <>
    {status === "succeeded" && (
      <Box
            id="hero"
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // height: "75vh",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            padding: 3,
            }}
        >
            <Typography variant="h2" >
            Welcome to My Dashboard. 
            </Typography>
            <Typography variant="h5" gutterBottom>
            {users.bio}
            </Typography>
            <Button variant="contained" color="primary" href="#contact">
            Contact Me
            </Button>
            <Typography variant="body1" gutterBottom>
            Explore my portfolio of professional work and expertise.
            </Typography>
            <Button variant="outlined" color="secondary" href="#projects">
            View Projects
            </Button>
        </Box>
        )}
    {status === "loading" && <CircularProgress />}
    </>
    
    
  );
};

export default Hero;
