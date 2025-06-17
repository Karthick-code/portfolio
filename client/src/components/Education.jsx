import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../slices/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

const Education = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") return <CircularProgress />;
  if (status === "failed") return <p>Error: {error}</p>;

//   console.log(users);

  return (
    <Box id="education" sx={{ py: 5,backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom>
        Education
      </Typography>
      <Timeline position="alternate">
        {status === "succeeded" && users.education.map((edu, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align={index % 2 === 0 ? "right" : "left"}
              variant="body2"
              color="textSecondary"
            >
              {edu.year }
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < users.education.length  && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card sx={{ height: "100%", boxShadow: 3, position: 'relative' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {edu.degree}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {edu.institute}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {edu.percentage}%
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default Education;
