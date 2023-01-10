import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useAlert } from '../pages/hook/useAlert';
import WriteComponent from '../pages/write';
import RaadComponent from '../pages/read';
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
              <WriteComponent value={value} theme={theme}/>
          </TabPanel>
          
          <TabPanel value={value} index={1} dir={theme.direction}>
              <RaadComponent/>
          </TabPanel>
                 
      </Container>
    )
}