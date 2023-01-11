import * as React from 'react';
import List from '@mui/material/List';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { writeDataType } from '../@types';
import dayjs from 'dayjs';

interface Props {
  datas : writeDataType[]
}


export default function TimeLine( { datas } : Props ) {
  

  return (
    <Box style={{width:"50%",maxHeight:300,overflowY:"scroll"}}>

    <Timeline
      sx={{
        [`& .${timelineContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
    { datas?.map(( data , index )=> {

      const { title , recode } = data.datas;

      const { start , end } = data.date;

      return (  
      <TimelineItem key={data.datas.title}>
        <TimelineOppositeContent color="textSecondary">

        <List sx={{width:300}}>
          <ListItem disablePadding>
            <ListItemButton>
            
              <ListItemText primary={`${end}`}/>

            </ListItemButton>
          </ListItem>
        </List>

        </TimelineOppositeContent>
       
        <TimelineSeparator>
          <TimelineDot/>
        {index !== datas.length && <TimelineConnector/> }
        </TimelineSeparator>
        
        <TimelineContent>

        <List sx={{width:300}}>
          <ListItem disablePadding>         

              <ListItemText primary={` ${title} `}/>

              <ListItemText primary={` ${recode} `}/>

          </ListItem>
          <ListItem disablePadding>         


          </ListItem>
        </List>

        </TimelineContent>

      </TimelineItem>
    )}
    )}
      
    </Timeline>
    </Box>
  );
}