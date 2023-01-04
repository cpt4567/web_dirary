import { Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { getWebCam } from "./api";

export default function VideoComponent() {
    
    const videoElement = useRef< HTMLVideoElement | null >( null )

    const captureElement = useRef< HTMLVideoElement | null >( null )

    const [videoEvent,setVideoEvent] = useState<any> ()

    const [captureEvent,setCaptureEvent] = useState<any> ()

    const [test, setTest] = useState<any[]>([])
    const [test2, setTest2] = useState<any[]>([])

    const option = {
        video:{
            autoPlay : true,
        }
    }

    const displayMediaOptions : any = {
        video: {
          displaySurface: "window"
        },
        audio: false
    };


    //이 기사에서는 Screen Capture API WebRTC https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
/**
*  @url  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 *   
     * */ 



    const onReadCam = async () => {
      
        try {     
            const stream = await navigator.mediaDevices.getUserMedia( { video : true , audio : false } );
                
            if(videoElement.current){
                
                videoElement.current.srcObject = stream ;
                
                let reader = new MediaRecorder(stream);
                
                reader.ondataavailable = (event)=>{
                    console.log(event);
                    
                    // 녹화 데이터(Blob)가 들어올 때마다 배열에 담아두기
                    setTest( test.concat(event.data) );
                }             
            

                setVideoEvent( reader )
                                
            }

        } 

        catch (err) { 
            console.error(`Error: ${err}`);
        }

    }

    const onReadDisplayCapture = async () =>{

        try {

            if( captureElement.current){
                
                const captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                captureElement.current.srcObject = captureStream ;

                let reader = new MediaRecorder(captureStream);
                                
                reader.ondataavailable = (event)=>{    
                    // 녹화 데이터(Blob)가 들어올 때마다 배열에 담아두기
                    setTest2( test2.concat(event.data) );
                }             

                setCaptureEvent( reader )

                

            }



        } 
        catch (err) {
          console.error(`Error: ${err}`);
        }


    }


    useEffect(() => {
        onReadCam();
        onReadDisplayCapture();
        
        
       }, [])
    


    const onStart = () => {
        videoEvent.start()
        captureEvent.start()
        
    }

    const onResume = ()=> {

        videoEvent.resume()
        captureEvent.resume()
        
    }

    const onEnd = () => {
        
        captureEvent.stop()
        videoEvent.stop()

    }    

    const onDownload = ()=>{
        
        let downloadDom = document.createElement("a")

        const downloadfile = new Blob([test2[0]],{type:"video/avi"})

        const downloadUrl = window.URL.createObjectURL(downloadfile); 
    
        downloadDom.href = downloadUrl

        downloadDom.click();
        
        downloadDom.remove();
        
    }

    

    return (
        <Container >

        <Box className={"container"} >

            <Box className="container_items">
                <span>sasaSsaas</span>
            
                <video className="webcam_content" { ...option.video } ref={ videoElement } />
                <video className="capture_content" { ...option.video } ref={ captureElement } />
            </Box>
            
            <Box className="container_items" >
                <span>sasaSsaas</span>


            </Box>

            <Box className="container_items" >
                <span>sasaSsaas</span>

            </Box>

        </Box>

                <footer >
                    <button onClick={onStart}>start</button>
                    <button onClick={onEnd}>end</button>
                    <button onClick={onResume}>resume</button>
                    <button onClick={onDownload}>download</button>
                </footer>

        </Container>
    )
      
}