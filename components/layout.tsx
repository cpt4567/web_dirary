import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import VideoComponent from '../pages/video';
import Icon from './icon';
import { TabPanel } from "./tabpanel";
import Top from "./top";

export default function Layout() {
    
    const theme = useTheme();
    const [value, setValue] = useState(0);
    
    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
      };
    
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
              <VideoComponent value={value} theme={theme}/>
          </TabPanel>
          
          <TabPanel value={value} index={1} dir={theme.direction}>
          </TabPanel>
          
          <TabPanel value={value} index={2} dir={theme.direction}>
          </TabPanel>
        
       
      </Container>
    )
}