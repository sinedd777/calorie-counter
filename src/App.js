import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tracker from './pages/Tracker';



import './App.css'

const App = () => (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      <Footer />
    </Box>
  );
export default App