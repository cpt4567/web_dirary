import { SetStateAction, useEffect, useState } from "react"

interface Props {
    video : any
    display : any
    endEvent : () => void
}

/**
 * @param state {string}
*/

type ReturnType = [ videoEventHookProps , string , React.Dispatch<SetStateAction<"none" | "recording" | "paused" | "inactive">>  ];

export const useRecoding = ( { video , display , endEvent } : Props ) : ReturnType => {

    const [recodState, setRecodState] = useState< "none" | "recording" | "paused" | "inactive" >("none")

    const [eventObject,setEventObject] = useState<{ video:any , display:any }>({ video:{} , display:{} })

    useEffect(() => {

        setEventObject({video : video , display : display })

    }, [ video , display ])
    

    const onStart = () => {

        eventObject.video.start()
        eventObject.display.start()

            if(video.state==="recording",display.state === "recording"){
                setRecodState("recording")
            };
        
    } 
    
    const onPause = () => {

        eventObject.video.pause()
        eventObject.display.pause()
        
        if(video.state==="paused",display.state === "paused"){
            setRecodState("paused")
        };
    }

    const onResume = () => {
        eventObject.video.resume()
        eventObject.display.resume()

        if(video.state==="recording",display.state === "recording"){
            setRecodState("recording")
        };

    }

    const onEnd = () => {
        
        eventObject.display.stop()
        eventObject.video.stop()
        
        setRecodState("none")

        endEvent()
    }    


    return [ { onStart , onPause , onResume , onEnd } , recodState , setRecodState ]
    
}