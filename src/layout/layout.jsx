import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ApplicationBar from './components/appbar';
import Sidebar from './components/sidebar';
import { CssBaseline } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <ApplicationBar />
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      {children}
    </Box>
  </Box>
  );
};

export default Layout;
