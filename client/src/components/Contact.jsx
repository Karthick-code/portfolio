// import React, { useRef, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Snackbar,
//   Card,
//   Alert,
// } from "@mui/material";
// import emailjs from "@emailjs/browser";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { fetchUsers } from "../slices/userSlice";


// const Contact = () => {
//   const dispatch = useDispatch();
//   const { users, status, error } = useSelector((state) => state.user);
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const form = useRef();
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     type: "",
//     message: "",
//   });
//   const to_email = import.meta.env.VITE_EMAILJS_TO_EMAIL;
//   const sendEmail = (e) => {
//     e.preventDefault();

//     const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//     const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//     const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
//     console.log(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, to_email,name);
//     emailjs
//       .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
//       .then(
//         () => {
//           setSnackbar({
//             open: true,
//             type: "success",
//             message: "Message sent successfully!",
//           });
//           form.current.reset();
//         },
//         (error) => {
//           setSnackbar({
//             open: true,
//             type: "error",
//             message: "Failed to send message.",
//           });
//           console.log("EmailJS error:", error);
//         }
//       );
      
    
//   };
//   const handleClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Box id="contact" sx={{ py: 5 , backgroundColor: "#f5f5f5"}}>
//       <Card sx={{ p: 3, maxWidth: 600, margin: "0 auto", boxShadow: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Contact Me
//         </Typography>
//         <Box
//           component="form"
//           ref={form}
//           onSubmit={sendEmail}
//           sx={{ mt: 3, maxWidth: 600 }}
//         >
//           <input type="hidden" name="to_email" value={to_email} />
//           <input type="hidden" name="name" value={users.name || "User"} />

//           <TextField
//             fullWidth
//             label="Name"
//             name="from_name"
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             name="from_email"
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Message"
//             name="message"
//             multiline
//             rows={4}
//             margin="normal"
//             required
//           />
          
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//             Send
//           </Button>
//         </Box>
        
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={handleClose}
//         >
//           <Alert severity={snackbar.type} onClose={handleClose}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Card>
//     </Box>
//   );
// };

// export default Contact;



import React, { useEffect, useState } from "react";
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
import { fetchUsers } from "../slices/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });

  const to_email = import.meta.env.VITE_EMAILJS_TO_EMAIL;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formik = useFormik({
    initialValues: {
      from_name: "",
      from_email: "",
      message: "",
    },
    enableReinitialize: true, // in case `users.name` loads later
    validationSchema: Yup.object({
      from_name: Yup.string().required("Name is required"),
      from_email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const templateParams = {
        from_name: values.from_name,
        from_email: values.from_email,
        message: values.message,
        to_email: to_email,
        name: users.name || "User",
      };

      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(() => {
          setSnackbar({
            open: true,
            type: "success",
            message: "Message sent successfully!",
          });
          resetForm();
        })
        .catch((error) => {
          setSnackbar({
            open: true,
            type: "error",
            message: "Failed to send message.",
          });
          console.error("EmailJS error:", error);
        });
    },
  });

  return (
    <Box id="contact" sx={{ pt: 10, backgroundColor: "#f5f5f5" }}>
      <Card sx={{ p: 3, maxWidth: 600, margin: "0 auto", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contact Me
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3, maxWidth: 600 }}
        >
          <TextField
            fullWidth
            label="Name"
            name="from_name"
            margin="normal"
            value={formik.values.from_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.from_name && Boolean(formik.errors.from_name)}
            helperText={formik.touched.from_name && formik.errors.from_name}
          />

          <TextField
            fullWidth
            label="Email"
            name="from_email"
            margin="normal"
            value={formik.values.from_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.from_email && Boolean(formik.errors.from_email)}
            helperText={formik.touched.from_email && formik.errors.from_email}
          />

          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            margin="normal"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Send
          </Button>
        </Box>

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
