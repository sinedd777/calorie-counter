import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Home from './Home';
import Tracker from './Tracker';

const DefaultUser = () => {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        <Footer />
    </Box>  
    )
}

export default DefaultUser