import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box } from '@mui/system';

interface Props {
  onDayChange: (newValue: dayjs.Dayjs | null) => void
}

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};


export default function Canlander( { onDayChange } : Props ) {

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

  
  return (
    <Box style={{width:"50%"}}>
      
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
       /*  orientation="landscape" */       
       displayStaticWrapperAs="desktop"
        openTo="year"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          onDayChange(newValue);
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </Box>
  );
}