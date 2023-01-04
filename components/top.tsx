import { AppBar, Tab, Tabs } from "@mui/material"
import { green } from '@mui/material/colors';

interface Prop {
    value : number
    handleChange: (event: unknown, newValue: number) => void
}


export default function Top({value,handleChange}:Prop) {


    const a11yProps =(index: any) => {
        return {
          id: `action-tab-${index}`,
          'aria-controls': `action-tabpanel-${index}`,
        };
      }
      

    return (
        <AppBar position="static" color="default">
        
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    )
}