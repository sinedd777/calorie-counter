import { React, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Stack, TextField, Button, FormControl } from '@mui/material';


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



const Navbar = () => {


  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const [name, setName] = useState();
  const [email, setEmail] = useState()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.clear();
    alert('Logging Out')
    navigate('/login')
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError(!e.target.validity.valid);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const inviteUser = () => {
    console.log('Details posted!');
    console.log(
      {
        name: name,
        email: email
      }
    );
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <AppBar position="static">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Entry Added!
        </Alert>
      </Snackbar>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ left: 10 }}>
          <LunchDiningIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Calorie Tracker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={() => setOpenModal(true)} textAlign="center">Invite a friend</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={logout} textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <FormControl>

                  <Stack spacing={3}>
                    <TextField required id="Name" label="Name" variant="standard" onChange={(e) => { handleName(e) }} type="text" />
                    <TextField error={error} required id="Email" label="Email" variant="standard" onChange={(e) => { handleEmail(e) }} type="email" />

                    <Button disabled={!(name && email && !error)} onClick={inviteUser} variant="contained" color="success"> Submit </Button>
                  </Stack>
                </FormControl>
              </Box>

            </Modal>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar