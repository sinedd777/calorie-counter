import { React, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DescriptionIcon from '@mui/icons-material/Description';
import AdminUserDetails from '../components/AdminUserDetails';
import AdminFoodDetails from '../components/AdminFoodDetails';
import AdminStatsDetails from '../components/AdminStatsDetails';


const drawerWidth = 240;

export default function ClippedDrawer() {

  const [screen, setScreen] = useState('Users');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Users', 'Food Entries', 'Reports'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => setScreen(text)}>
                <ListItemButton >
                  <ListItemIcon >
                    {index === 0 ? <PeopleIcon /> : ''}
                    {index === 1 ? <FastfoodIcon /> : ''}
                    {index === 2 ? <DescriptionIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {screen === 'Users' && <AdminUserDetails />}
        {screen === 'Food Entries' && <AdminFoodDetails />}
        {screen === 'Reports' && <AdminStatsDetails />}
      </Box>
    </Box>
  );
}
