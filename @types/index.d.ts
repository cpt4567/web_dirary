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

type videoStateProps = {
    videoEvent?:any
    captureEvent?:any
}