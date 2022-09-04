import {React, useState }from 'react';
import { FormControl, TextField, Box  } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { addFood } from '../services/Apis';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';


const Form = () => {
    const [date, setDate] = useState([]);
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [open, setOpen] = useState(false);

    const handleDate = (newValue) => {
        setDate(moment(newValue).format('YYYY-MM-DD'));
    };
    const handleName = (newValue) => {
        setName(newValue.target.value)    
    };
    
    const handleCalories = (newValue) => {
        setCalories(newValue.target.value);
    };

    const resetValues = () => {
        setDate(moment());
        setName('');
        setCalories('');
    }

    const submit = () => {
        addFood(name, calories, date);
        setOpen(true);
        resetValues();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

  return (
    <Box sx={{
        mt: { lg: '212px', xs: '70px'},
        ml: { sm: '50px'}
    }} position="relative" p="20px">
    
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Entry Added! 
        </Alert>
      </Snackbar>
    <FormControl>
        <Stack spacing={2}>
            <TextField required id="food-name" label="Food Name" variant="standard"  onChange={handleName} value={name}/>
            <TextField required id="calories" label="Calories" variant="standard" onChange={handleCalories} value={calories} type="number" />
            <LocalizationProvider dateAdapter={ AdapterMoment }>
                <DesktopDatePicker
                required
                label="Date"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={handleDate}
                disableFuture
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant={!(date&&name&&calories) ? 'outlined' : 'contained'} disabled={ !(date&&name&&calories)} onClick={submit}>Add</Button>
        </Stack>
    </FormControl>
    </Box>
  )
}

export default Form