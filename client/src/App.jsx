import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CssBaseline, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchProjects } from './slices/projectSlice';

function App() {
  

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container align="center" sx={{ mt: 4 }} maxWidth="100%">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </Container>
      <Footer />
    </>
  );
}

export default App;
