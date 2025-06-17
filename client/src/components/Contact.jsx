import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Card,
  Alert,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../slices/userSlice";


const Contact = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const form = useRef();
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });
  const to_email = import.meta.env.VITE_EMAILJS_TO_EMAIL;
  const sendEmail = (e) => {
    e.preventDefault();

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    console.log(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, to_email,name);
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setSnackbar({
            open: true,
            type: "success",
            message: "Message sent successfully!",
          });
          form.current.reset();
        },
        (error) => {
          setSnackbar({
            open: true,
            type: "error",
            message: "Failed to send message.",
          });
          console.log("EmailJS error:", error);
        }
      );
      
    // .then(() => {
    //   setSnackbarOpen(true);
    //   form.current.reset();
    // })
    // .catch((error) => {
    //   console.error("EmailJS error:", error);
    // });
  };
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box id="contact" sx={{ py: 5 }}>
      <Card sx={{ p: 3, maxWidth: 600, margin: "0 auto", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contact Me
        </Typography>
        <Box
          component="form"
          ref={form}
          onSubmit={sendEmail}
          sx={{ mt: 3, maxWidth: 600 }}
        >
          <input type="hidden" name="to_email" value={to_email} />
          <input type="hidden" name="name" value={users.name || "User"} />

          <TextField
            fullWidth
            label="Name"
            name="from_name"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="from_email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            margin="normal"
            required
          />
          {/* <input type="hidden" name="to_email" value="karthi02.chat@gmail.com" /> */}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Send
          </Button>
        </Box>
        {/* <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message="Message sent successfully!"
        /> */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert severity={snackbar.type} onClose={handleClose}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
};

export default Contact;
