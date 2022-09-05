import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllUsers, removeUser, updateUser } from '../services/Apis'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import UpdateUserModal from './UpdateUserModal';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const AdminUserDetails = () => {

    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [openSnackbar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          const list = await getAllUsers();
          setUsers([...list]);
        }
        fetchData();
        setReload(false);
    },[reload])

    const deleteUser = (username) => {
        removeUser(username);
        setReload(true);
        setOpenSnackBar(true);
    }

  return (
        
        <TableContainer component={Paper}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackBar(false)}>
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    User Deleted! 
                </Alert>
            </Snackbar>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Calorie Limit</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Update</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((row) => (
                    <TableRow
                    key={row.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell align="right">{row.calorieLimit}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">
                        <UpdateUserModal reload={setReload} user={row} users/>
                    </TableCell>                  
                    <TableCell align="right" >
                        <Button disabled={row.role === 'user' ? false: true} onClick={() => deleteUser(row.username)}><DeleteIcon /></Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminUserDetails