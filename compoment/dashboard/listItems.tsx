import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';


const lnbDefine = [
  { primary : "diary" , icon : <DashboardIcon/> ,link:"/dashboard/video" },
  { primary : "habit" , icon : <DashboardIcon/> ,link:"/dashboard/video"},
]

export const mainListItems = (
  <React.Fragment>

   { lnbDefine.map(( data , index )=> 
    
    <Link href={data.link} key={index} >
      <ListItemButton >      
       <ListItemIcon>
            {data.icon}
        </ListItemIcon>
      <ListItemText primary={data.primary} />
    </ListItemButton>
    
    </Link>

  )}
    
  </React.Fragment>
)

