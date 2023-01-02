import { CssBaseline } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Navigation from '../ navigation';
import Header from '../header';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';


interface Props {
    children :React.ReactNode

}


export default function Layout({children}:Props) {
    const mdTheme = createTheme();

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
  


    return (
        <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
            <Navigation {...{open:open,onClick:toggleDrawer}} />
            <Header {...{open:open,onClick:toggleDrawer}} />
            {children}
        </Box>
        </ThemeProvider>
        ) 
}