import dayjs from "dayjs"
import { SetStateAction, useEffect, useState } from "react"
import { videoEventHookProps } from "../../@types"

interface Props {
    video : any
    display : any
    endEvent : () => void
}

/**
 * @param state {string}
*/

export type DayType = {start:string , end : string }

type ReturnType = [ videoEventHookProps , string , React.Dispatch<SetStateAction<"none" | "recording" | "paused" | "inactive">> , DayType  ];

export const useRecoding = ( { video , display , endEvent } : Props ) : ReturnType => {

    const [recodState, setRecodState] = useState< "none" | "recording" | "paused" | "inactive" >("none")

    const [eventObject,setEventObject] = useState<{ video:any , display:any }>({ video:{} , display:{} })

    const [date,setDate] = useState<DayType>({ start:"" , end : "" })

    useEffect(() => {

        setEventObject({video : video , display : display })

    }, [ video , display ])
    

    const onStart = () => {
        
        const day = dayjs(new Date()).format("YYYY-MM-DD-H:MM:ss")

        eventObject.video.start()
        eventObject.display.start()

        setDate((pre) => ({ ...pre , start: day } ))

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
        
        const day = dayjs(new Date()).format("YYYY-MM-DD-H:MM:ss")

        eventObject.display.stop()
        eventObject.video.stop()
        
        setDate((pre) => ({ ...pre , end: day } ))

        setRecodState("none")

        endEvent()
    }    


    return [ { onStart , onPause , onResume , onEnd } , recodState , setRecodState ,  date ]
    
}