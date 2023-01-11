import { inputType } from "../components/alert"
import { DayType } from "../pages/hook/useRecoding"

type videoEventType = {
    onEnd: ()=> void
    onPause:()=> void
    onResume:()=> void
    onStart:()=> void
}

interface videoEventProps extends videoEventType {
    onAdd:()=> void
}


interface videoEventHookProps extends videoEventType {
    
}

type writeDataType = {

    datas:{ title : strig , recode : string }
    date:{ start : string , end : string }

}


type saveParamsProps = {date : DayType , datas : inputType }

type videoStateProps = {
    videoEvent?:any
    captureEvent?:any
}