import { useState } from "react";
import Alert from "../../components/alert";

interface Props {
    
}

type ReturnType = [ ()=> void , JSX.Element ]

export const useAlert = ( { } ) : ReturnType  => {

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
    const AlertRenderer = () => {

        return(
            <Alert
            open={open}
            handleClose={handleClose}
        />
        ) 
    }


    return [  handleOpen , <AlertRenderer key={0} /> ]
}