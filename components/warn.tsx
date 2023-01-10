import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


interface Props {
    open : boolean
    onClose : ()=> void 
}

export default function Warn( { open , onClose } : Props ) {
    
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        borderRadius:2,
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
          
      <React.Fragment>
        <Modal
          hideBackdrop
          open={open}
          onClose={onClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Warning</h2>
            <p id="child-modal-description">
            Please enter required values.
            </p>
           
            <Button variant="contained" color={"inherit"} onClick={()=>{onClose()}} sx={{fontWeight:"bold" , float:"right"}} >
                Cancel
           </Button>

          </Box>
        </Modal>
      </React.Fragment>
    );

}