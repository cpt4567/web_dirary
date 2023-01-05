import { Theme } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../components/icon";
import { getWebCam } from "./api";


interface Props {
    value : number
    theme : Theme
}


export default function VideoComponent( { value , theme } : Props) {
    
    const videoElement = useRef< HTMLVideoElement | null >( null )

    const captureElement = useRef< HTMLVideoElement | null >( null )

    const [videoEvent,setVideoEvent] = useState<any> ()

    const [captureEvent,setCaptureEvent] = useState<any> ()


    const [recode , setRecode] = useState<{ webcam : Array<any> , display : Array<any> }>({webcam:[],display:[]})
    

    const option = {
        video:{
            autoPlay : true,
            width:100
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
                    // 녹화 데이터(Blob)가 들어올 때마다 배열에 담아두기
                    setRecode((pre) => ( { display : pre.display, webcam : pre.webcam.concat(event.data) }) );
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
                    setRecode((pre) => ( { webcam : pre.webcam, display : pre.display.concat(event.data) }) );
                }             

                setCaptureEvent( reader )

            }
        } 
        catch (err) {
          console.error(`Error: ${err}`);
        }


    }

    const onAdd = () => {

        onReadCam()
        onReadDisplayCapture()

    }
    
    const onStart = () => {

        videoEvent.start(()=>{})
        captureEvent.start(()=>{})
        
    } 
    
    
    const onPause = () => {

        videoEvent.pause(()=>{})
        captureEvent.pause(()=>{})
        
    }

    const onResume = () => {
        videoEvent.resume(()=>{})
        captureEvent.resume(()=>{})
    }

    const onEnd = () => {
        
        captureEvent.stop(()=>{})
        videoEvent.stop(()=>{})

    }    

    const onDownload = ()=>{
        
        /* let downloadDom = document.createElement("a")

        const downloadfile = new Blob([test2[0]],{type:"video/avi"})

        const downloadUrl = window.URL.createObjectURL(downloadfile); 
    
        downloadDom.href = downloadUrl

        downloadDom.click();
        
        downloadDom.remove(); */
        
    }
    

    return (
        <Container >
          
                <video className="webcam_content" { ...option.video } ref={ videoElement } />
                <video className="capture_content" { ...option.video } ref={ captureElement } />
      
                <Icon
                    value={value}
                    theme={theme}
                    event={{onAdd,onStart,onPause,onResume,onEnd}}
                    state={{videoEvent,captureEvent}}
                />

        </Container>
    )
      
}