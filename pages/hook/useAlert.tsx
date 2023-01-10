import { useState } from "react";
import Alert, { inputType } from "../../components/alert";

interface Props {
    onSave : ( data : inputType ) => void 
}

type ReturnType = [ ()=> void , JSX.Element ]

export const useAlert = ( { onSave } : Props ) : ReturnType  => {

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
              onSave={onSave}
              onClose={handleClose}
        />
        ) 
    }


    return [  handleOpen , <AlertRenderer key={0} /> ]
}