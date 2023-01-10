import { Theme } from "@mui/material";
import { Container } from "@mui/material";
import { useRef, useState } from "react";
import Icon from "../components/icon";
import { postCaptureDisplay, postWebCam } from "./api";
import { useAlert } from "./hook/useAlert";
import { useRecoding } from "./hook/useRecoding";


interface Props {
    value : number
    theme : Theme
}


export default function WriteComponent( { value , theme } : Props) {
    
    const videoElement = useRef< HTMLVideoElement | null >( null )

    const captureElement = useRef< HTMLVideoElement | null >( null )

    const [videoEvent,setVideoEvent] = useState<any> ( null )

    const [captureEvent,setCaptureEvent] = useState<any> ( null )

    const [recode , setRecode] = useState<{ webcam : Array<any> , display : Array<any> }>({webcam:[],display:[]})
    
    const onSave =  () => {
        
        const webcamUpload = new Blob([recode.webcam[0]],{type:"video/mp4"})

        const captureUpload = new Blob([recode.display[0]],{type:"video/mp4"})
        
         postCaptureDisplay(captureUpload,);
        
         postWebCam(webcamUpload,);

    }

    const [ onAlertOpen , AlertRenderer ] = useAlert({ onSave })



    const endEvent = () => {

        setRecode({ webcam : [ ] , display : [ ] })


        if(videoElement.current && captureElement.current ){

            videoElement.current.srcObject = null ;

            captureElement.current.srcObject = null ;
        }

        onAlertOpen()
    }
    
    const [ eventObject , recodingState , setRecodingState ] = useRecoding( { video : videoEvent , display : captureEvent ,endEvent : endEvent })


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
                
                const captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions,);
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
        setRecodingState("inactive")
    }

    return (
        <Container >
          
                <video { ...option.video } ref={ videoElement } />
                <video { ...option.video } ref={ captureElement } />
      
                <Icon
                    value={value}
                    theme={theme}
                    event={{ onAdd , ...eventObject }}
                    state={recodingState}
                />

                {AlertRenderer}

        </Container>
    )
      
}