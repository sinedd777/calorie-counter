import {React, useState, useEffect} from 'react'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import { Button, TextField, Box, FormControl } from '@mui/material';
import { updateFoodItem } from '../services/Apis';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const UpdateFoodModal = ({item, reload}) => {

    const [date, setDate] = useState(moment(item.date).format('YYYY-MM-DD'));
    const [name, setName] = useState(item.name);
    const [calories, setCalories] = useState(item.calories);


    const handleDate = (newValue) => {
        setDate(moment(newValue).format('YYYY-MM-DD'));
    };
    const handleName = (newValue) => {
        setName(newValue.target.value)    
    };
    
    const handleCalories = (newValue) => {
        setCalories(newValue.target.value);
    };


    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackBar] = useState(false);

    
    const submit = () => {
        updateFoodItem(item._id,name,calories,date);
        setOpenModal(false);
        setOpenSnackBar(true);
        reload(true);
    }

    return (
        <div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
                <Alert variant="filled"  severity="success" sx={{ width: '100%' }}>
                    Calorie Count Updated! 
                </Alert>
            </Snackbar>
            <Button  onClick={ () => setOpenModal(true)}><ChangeCircleIcon /></Button>
                <Modal
                    open={openModal}
                    onClose={ () => setOpenModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                    <FormControl>
                        <Stack spacing={2}>
                            <TextField required id="food-name" label="Food Name" variant="standard"  onChange={handleName} value={name}/>
                            <TextField required id="calories" label="Calories" variant="standard" onChange={handleCalories} value={calories} InputProps={{ inputProps: { min: 1} }} type="number" />
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
                            <Button variant={!(date&&name&&calories) ? 'outlined' : 'contained'} color="success" disabled={ !(date&&name&&calories)} onClick={submit}>Add</Button>
                        </Stack>
                    </FormControl>
                    </Box>
                                
                </Modal>
        </div>
      )
}

export default UpdateFoodModal