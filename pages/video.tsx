import { useCallback, useEffect, useRef } from "react";

export default function Vedeo() {
    
    const videoElement = useRef< HTMLVideoElement | null >( null )

    const option = {
        autoPlay : true,
        style:{ width:300 , height:300 }
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
   /*  useEffect(() => {
        // 보안 컨텍스트: 이 기능은 일부 또는 모든 지원 브라우저 에서 보안 컨텍스트 (HTTPS) 에서만 사용할 수 있습니다 . 
        // 이 메서드 는 요청된 미디어 유형을 포함하는 트랙 을 생성하는 미디어 입력을 사용할 수 있는 권한을 사용자에게 요청합니다

        let stream = new MediaStream() ;
    
        let source = new MediaSource();
    
      }, [videoElement]) */
    
      
/* 
      const onReadCam = async () => {

        try {
             
            const stream = await navigator.mediaDevices.getUserMedia( { video : true , audio : true } );
                
                if(!!videoElement && !!videoElement.current && !!videoElement.current.srcObject)

                    videoElement.current.srcObject = stream

        } 
        catch (err) { 
            console.log(err);
        }

    }     */

    const onReadCam = async () => {

        try {     
            const stream = await navigator.mediaDevices.getUserMedia( { video : true , audio : true } );
                
            if(videoElement.current){
                
                videoElement.current.srcObject = stream ;
            }

        } 

        catch (err) { 
            console.log(err);
        }

    }

    useEffect(() => {
        /* if (navigator.mediaDevices.getUserMedia) */
            onReadCam()
    }, [])
    

    return (
        <>
        <video { ...option } ref={ videoElement } />
{/*         <button onClick={onReadCam}>assaas</button>
 */}        </>
    )
      
}