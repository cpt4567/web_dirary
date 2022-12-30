import { useCallback, useEffect, useRef, useState } from "react";

export default function Vedeo() {
    
    const videoElement = useRef< HTMLVideoElement | null >( null )
    
    const [videoEvent,setVideoEvent] = useState<any> ()

    const [test, setTest] = useState<any[]>([])

    const option = {
        autoPlay : true,
        style:{ width:1200 , height:500 }
    }
/* 

        let stream = new MediaStream() ;
    
        let source = new MediaSource();

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

https://curryyou.tistory.com/443
*/
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
     * @url https://developer.mozilla.org/en-US/docs/Web/API/Navigator
     *   
     * */ 

    const onReadCam = async () => {
// 보안 컨텍스트: 이 기능은 일부 또는 모든 지원 브라우저 에서 보안 컨텍스트 (HTTPS) 에서만 사용할 수 있습니다 . 
        // 이 메서드 는 요청된 미디어 유형을 포함하는 트랙 을 생성하는 미디어 입력을 사용할 수 있는 권한을 사용자에게 요청합니다

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
                reader.onstop = (event)=>{
                    // 배열에 담아둔 녹화 데이터들을 통합한 Blob객체 생성
                    const videoBlob = new Blob(test);

                }

                setVideoEvent( reader )

                videoElement.current.onloadedmetadata = () => {
                    videoElement.current?.play();
                }
                                
            }

        } 

        catch (err) { 
            console.log(err);
        }

    }

    useEffect(() => {
        onReadCam();        
    }, [])
    


    const onStart = () => {

        videoEvent.start()        
    }

    const onEnd = () => {
        videoEvent.stop()

    }    

    const onDownload = ()=>{

        let downloadDom = document.createElement("a")

        const downloadfile = new Blob([test[0]],{type:"video/x-matroska;codecs=avc1"})

        const downloadUrl = window.URL.createObjectURL(downloadfile); // 해당 file을 가리키는 url 생성
        
        downloadDom.href = downloadUrl

        downloadDom.click()
        
    }


    useEffect(() => {
        console.log(test,"데이터");

    }, [test])
    
    

    return (
        <>
        <video { ...option } ref={ videoElement } />
        <button onClick={onStart}>start</button>
        <button onClick={onEnd}>end</button>
        <button onClick={onDownload}>download</button>

        </>
    )
      
}