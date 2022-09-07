import { React, useState } from 'react'
import Form from './../components/Form';
import Tracker from './Tracker';
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [reload, setReload] = useState(false)

    if (!localStorage.getItem('token')) {
        alert('Not Authorised!')
        navigate('/login')
        return;
    }


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