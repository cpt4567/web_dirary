import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import { useWarn } from '../pages/hook/useWarn';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight:300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:2,
    pt: 2,
    px: 4,
    pb: 3,
};

interface Props {
    open : boolean 
    onSave : (data : inputType )=> void 
    onClose : ()=> void
}

export type inputType = {
  title : string
  recode : string 
}

export default function Alert ({open, onSave , onClose }:Props) {

    const [ text , setText ] = useState<inputType>({ title: "" , recode : ""  })
    
    const [ warnRenderer , openwarm ] = useWarn();
    

    const onChange = ( event : React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement> ) => {

          const { name , value } = event.target ;

          setText((pre) => ( { ...pre , [name] : value } ) );

    }

    const onReset = () => {

        setText({ title: "" , recode : "" })

    }

    const onValidation = () => {

        const successFor = () => {
            onSave(text); 
            onClose(); 
            onReset();
        }        

        ( !!text.title && !!text.recode ) ? successFor() : openwarm()   

    }


    return (
        <div>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{display:"flex" ,justifyContent:"center"}}
        >
          <Box sx={style}>
            
            {warnRenderer}

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <SaveIcon/> Save
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 ,marginBottom : 35 }} >

            <TextField id="outlined-basic" label="title" variant="outlined" name={"title"} onChange={onChange} value={text.title} sx={{width:"80%" , marginBottom : 3}} />
            <TextField id="outlined-basic" label="recode name" variant="outlined" name={"recode"} onChange={onChange} value={text.recode} sx={{width:"80%"}} />

            </Typography>

            <Box sx={{float:"right"}}>
              
              <Button variant="contained" color="success" onClick={onValidation} sx={{marginRight:3 , fontWeight:"bold"}} >
                Save
              </Button>

              <Button variant="contained" color={"inherit"} onClick={()=>{onClose(); onReset(); }} sx={{fontWeight:"bold"}} >
                Cancel
              </Button>

            </Box>
            
          </Box>
          

        </Modal>
      </div>
    )
}