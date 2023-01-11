import { Box, Container } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import Canlender from "../components/calender";
import TimeLine from "../components/timeline";
import { getCaptureDisplay, getWebCam, getWebcamList } from "./api"
import { useReadVideo } from "./hook/useReadVideo";

export default function ReadComponent () {

    const [ content , setContent ] = useState<any[]>([]);
    
    const [ defaultContent , setdefaultContent ] = useState<any[]>([]);
    
    const webcamElement = useRef< HTMLVideoElement | null >( null );

    const displayElement = useRef< HTMLVideoElement | null >( null );


    useEffect(()=>{
        getWebcamList().then((res)=> {
            
          setContent( dateFilterFor( res.data , dayjs(new Date() ) ) )

          setdefaultContent( res.data )
          
        })
    },[])

    const [ onCamRead ] = useReadVideo({api : getWebCam, ref : webcamElement })

    const [ onDisRead ] = useReadVideo({api : getCaptureDisplay , ref : displayElement })

     const onReadVideo = ( fileName : string ) => {

        onCamRead(fileName);

        onDisRead(fileName);
        
    }
    
    const dateFilterFor = ( datas : any , newValue : dayjs.Dayjs ) => {

        const filter = datas.filter((data:any)=> { 
                
            const split =  data.date.end.split("-");            

            return `${split[0]}-${split[1]}-${split[2]}` ===  newValue.format("YYYY-MM-DD")
             
        })
    
        return filter ; 

    }

    const onDayChange = (newValue : dayjs.Dayjs | null ) => {

        if(newValue){

           setContent( dateFilterFor(defaultContent , newValue) )

        }
        
    }

    return (
        <>
        <Container sx={{display:"flex", justifyContent:"space-between"}}>

            <Canlender onDayChange={onDayChange} />
            
            <TimeLine datas = {content} onReadVideo={onReadVideo} />

        </Container> 
 
        <Container sx={{display:"flex", justifyContent:"space-between"}}>

            <Box style={{width:"50%"}}>
                 <video ref={webcamElement} id="videoPlayer" style={{width:"90%",height:300}} controls muted={true} autoPlay >
                 <source src="/webcam" type="video/mp4" />
                 </video>
            </Box>
            
            <Box style={{width:"50%"}}>
                <video ref={displayElement} id="videoPlayer" style={{width:"90%" ,height:300}} controls muted={true} autoPlay >
                <source src="/webcam" type="video/mp4" />
                </video>
            </Box>

        </Container>

     </>
    )
}