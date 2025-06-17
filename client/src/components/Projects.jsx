import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../slices/projectSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Chip, Container } from "@mui/material";
import { motion } from "framer-motion";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  if (status === "loading") {
    return (
      <div>
        <CircularProgress />{" "}
      </div>
    );
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  console.log(projects);
  return (
    <Box id="projects" sx={{ py: 5, backgroundColor: "#f5f5f5" }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project,index) => (
              <Grid  key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card sx={{ height: "100%", boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {project.technologies.map((tech, index) => (
                          <>
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              color="secondary"
                            />
                            {(index < project.technologies.length - 1)?(
                            <Typography > |</Typography>):""}
                          </>
                          
                        ))}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outlined"
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Button>
                        <Button
                          variant="contained"
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
    // <Box id="projects" sx={{ py: 5 }}>
    //   <Typography variant="h4" gutterBottom>
    //     Projects
    //   </Typography>
    //   <Grid container spacing={4} mt={2}>
    //     {projects.map((project, index) => (
    //       <Grid item xs={12} sm={6} md={4} key={index}>
    //         <Card>
    //           <CardMedia
    //             component="img"
    //             height="140"
    //             image={project.image}
    //             alt={project.title}
    //           />
    //           <CardContent>
    //             <Typography variant="h6">{project.title}</Typography>
    //             <Typography variant="body2">{project.description}</Typography>
    //           </CardContent>
    //         </Card>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Box>
  );
};

export default Projects;
