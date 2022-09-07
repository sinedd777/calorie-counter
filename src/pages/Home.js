import { React, useState } from 'react'
import Form from './../components/Form';
import Tracker from './Tracker';
import { Grid, Stack, Box } from '@mui/material'

const Home = () => {
    const [reload, setReload] = useState(false)
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
        >
            <Form reload={reload} setReload={setReload} />
            <Tracker reload={reload} />
        </Grid>
    )
}

export default Home