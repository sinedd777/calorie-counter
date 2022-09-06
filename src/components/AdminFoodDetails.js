import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllFoodItemsAdmin, deleteFoodItem } from '../services/Apis'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import UpdateFoodModal from './UpdateFoodModal';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';


const AdminFoodDetails = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [openSnackbar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllFoodItemsAdmin();
            setUsers([...list]);
        }
        fetchData();
        setReload(false);
    }, [reload])

    const deleteFood = (id) => {
        deleteFoodItem(id)
        setReload(true);
        setOpenSnackBar(true);
    }

    return (

        <TableContainer component={Paper}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Food Item Deleted!
                </Alert>
            </Snackbar>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">User</TableCell>
                        <TableCell align="right">Food Name</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Consumed on</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{moment(row.date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell align="right">
                                <UpdateFoodModal reload={setReload} item={row} />
                            </TableCell>
                            <TableCell align="right" >
                                <Button onClick={() => deleteFood(row._id)}><DeleteIcon /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default AdminFoodDetails