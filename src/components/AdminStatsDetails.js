import { React, useState, useEffect } from 'react'
import { getWeeklyStats, getWeeklyConsumption } from '../services/Apis'
import { Box, Toolbar, Typography, Stack } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const AdminStatsDetails = () => {

    const [weeklyConsumption, setweeklyConsumption] = useState('')
    const [weeklyCount, setWeeklyCount] = useState([])
    const [user, setUser] = useState('')
    const [calories, setCalories] = useState('')
    const [counter, setCounter] = useState(1)

    const getWeeklyEntries = async (number) => {
        const count = await getWeeklyStats(number || 1);
        setWeeklyCount(count);
    }

    const getAverageWeekly = async () => {
        const count = await getWeeklyConsumption();
        setweeklyConsumption(count);
        console.log(moment().format("DD-MM-YYYY"));
        console.log(moment().subtract(7, 'days').format("DD-MM-YYYY"));
    }

    useEffect(() => {
        getAverageWeekly();
        getWeeklyEntries();
    }, [])

    const handleChange = (event) => {
        setUser(event.target.value);
        const object = weeklyConsumption.filter(element => element._id === event.target.value);
        setCalories((object[0].calories / 7).toFixed(2));
    };

    return (
        <div>
            <Stack spacing={2}>
                <Box sx={{
                    p: 5, backgroundImage: "linear-gradient(#C2185B,#E91E63)", color: "white", boxShadow: "inset 0 0 50px #FF5722", textAlign: "center"
                }}>
                    <Typography variant='h2' sx={{
                        textShadow: "2px 3px #CDDC39, -3px -5px #E64A19"
                    }}>{weeklyCount} new Entries in the current week! <TrendingUpIcon sx={{
                        textShadow: "2px 3px #CDDC39, -3px -5px #E64A19", fontSize: 60
                    }} /> </Typography>
                    <Typography variant='h7'>Calculated from {moment().subtract((counter)*+7, 'days').format("DD-MM-YYYY")} to {moment().subtract((counter-1)*+7,'days').format("DD-MM-YYYY")}</Typography>

                    <Fab size='small'  sx={{
                        position: 'absolute',
                        right: 30,
                        mt:2,
                        backgroundColor:"yellow"
                    }} aria-label='Next 7 days' onClick={() => {getWeeklyEntries(counter+1); setCounter(counter+1)}}>
                        <NavigateNextIcon />
                    </Fab>
                    
                    <Fab size='small' disabled= {counter <= 1} sx={{
                        position: 'absolute',
                        left: 270,
                        mt:2,
                        backgroundColor:"yellow"
                    }} aria-label='Previous 7 days'  onClick={() => {getWeeklyEntries(counter-1); setCounter(counter-1)}}>
                        <NavigateBeforeIcon />
                    </Fab>

                </Box>
                <Toolbar/>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Get Average</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="Get Average"
                        onChange={(e) => handleChange(e)}
                    >
                        {weeklyConsumption && weeklyConsumption.map((e) => (
                            <MenuItem key={e._id} value={e._id}>{e._id}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {user && <Box sx={{
                    p: 5, backgroundImage: "linear-gradient(#C2185B,#E91E63)", color: "white", boxShadow: "inset 0 0 50px #FF5722", textAlign: "center"
                }}>
                    <Typography variant='h5' >{calories} Calories consumed daily on average in the past week</Typography>
                </Box>
                }
            </Stack>
        </div>
    )
}

export default AdminStatsDetails