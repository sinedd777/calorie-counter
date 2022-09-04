import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'

import Logo from '../assets/images/Logo.png'

const Navbar = () => {
  return (
    <Stack 
        direction="row"
        sx={{ gap: {sm:'122px', xs:'40px'}, mt: {sm:'32px', xs:'20px'}, justifyContent:'none'}} 
        justifyContent="space-around" 
    >
        <Link to="/">
            <img src = {Logo} alt="logo" style={{
                width: '48px', height: '48px', margin: '0 20px'
            }}></img>
        </Link>
        <Stack
            direction="row"
            gap="40px"
            fontSize="24px"
            alignItems="flex-end" 
        >
            <Link 
                to="/" 
                style={{ textDecoration: 'none'}}>
                    Home
            </Link>
            <a 
            href='tracker' 
            style={{ textDecoration: 'none'}}>
                Tracker
            </a>
        </Stack>
    </Stack>
    )
}

export default Navbar