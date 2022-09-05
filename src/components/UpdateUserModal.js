import {React, useState, useEffect} from 'react'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import { Button, TextField, Box } from '@mui/material';
import { updateUser } from '../services/Apis';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
  

const UpdateUserModal = ( {reload, user} ) => {

    const [updatedCalories, setUpdatedCalories] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openSnackbar, setOpenSnackBar] = useState(false);

    
    const updateCalories = (username,calories) => {
        updateUser(username,calories);
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
        <Button disabled={user.role === 'user' ? false: true} onClick={ () => setOpenModal(true)}><ChangeCircleIcon /></Button>
            <Modal
                open={openModal}
                onClose={ () => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Stack  spacing={3}>
                        <TextField required id="calories" label="Calories" variant="standard" onChange={ (e) => setUpdatedCalories(e.target.value)} type="number" />
                        <Button onClick={ () => updateCalories(user.username, updatedCalories)} variant="contained" color="success"> Submit </Button>
                    </Stack>
                </Box>
                            
            </Modal>
    </div>
  )
}

export default UpdateUserModal