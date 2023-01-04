import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { green } from '@mui/material/colors';

import VideoComponent from './video';
import { Container } from '@mui/material';
import { TabPanel } from '../components/tabpanel';
import Top from '../components/top';

export default function Home() {
  
  return (
    <>
    <FloatingActionButtonZoom/>
   {/*  <VideoComponent/>      */}
    </>
  )
}



 function FloatingActionButtonZoom() {
  
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  
  const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[600],
    },
  };
  
  
  const fabs = [
    {
      color: 'primary' as 'primary',
      sx: fabStyle as SxProps,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary' as 'secondary',
      sx: fabStyle as SxProps,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit' as 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <Container
      sx={{
        bgcolor: 'background.paper',
        width: "100%",
        height:"100%",
        minHeight:400
      }}
    >
      <Top 
       value={value}
       handleChange={handleChange}
      />

        <TabPanel value={value} index={0} dir={theme.direction}>

        </TabPanel>
        
        <TabPanel value={value} index={1} dir={theme.direction}>
        </TabPanel>
        
        <TabPanel value={value} index={2} dir={theme.direction}>
        </TabPanel>

      {fabs.map((fab, index) => (

        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Container>
  );
}

