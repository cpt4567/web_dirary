import { Box, Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Canlender from "../components/calender";
import TimeLine from "../components/timeline";
import { getWebCam, getWebcamList } from "./api"

export default function ReadComponent () {

    const [ data , setData ] = useState<any>([])

    const videoElement = useRef< HTMLVideoElement | null >( null );

    useEffect(()=>{
        getWebcamList().then((res)=> setData(res.data) )
    },[])

     const test = async () => {

        const res = await getWebCam();
        
        const { body } = res ;
        
        if(body){
            
            const reader = body.getReader();

            let buffer = [];


                while (1) {
                    const { value, done } : any = await reader.read();
                    
                    if (done && videoElement.current) {
                      
                        const blob = new Blob(buffer);
                        
                        const blobUrl = URL.createObjectURL(blob);
                        
                        videoElement.current.src = blobUrl;

                        break;
                    }

                    buffer.push(value);
                }
            
            
        }

    }
    

    return (
        <>
        <Container sx={{display:"flex", justifyContent:"space-between"}}>

            <Canlender />
            
            <TimeLine datas = {data} />

        </Container>
 
        <Container sx={{display:"flex", justifyContent:"space-between"}}>

            <Box style={{width:"50%"}}>
                 <video ref={videoElement} id="videoPlayer" style={{width:"90%"}} controls muted={true} autoPlay >
                 <source src="/webcam" type="video/mp4" />
                 </video>
            </Box>
            
            <Box style={{width:"50%"}}>
                <video ref={videoElement} id="videoPlayer" style={{width:"90%"}} controls muted={true} autoPlay >
                <source src="/webcam" type="video/mp4" />
                </video>
            </Box>

        </Container>

     </>
    )
}