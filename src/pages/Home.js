import React from 'react'
import Form from './../components/Form';
import Tracker from './Tracker';
import { Grid } from '@mui/material'

const Home = () => {
    return (
        <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
            // background:'#af52bf'
        }}
        >            
            <Form/>
            <Tracker/>
        </Grid>
    )
}

export default Home