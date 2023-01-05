type videoEventProps = {
    onAdd:()=> void
    onEnd: ()=> void
    onPause:()=> void
    onResume:()=> void
    onStart:()=> void
}
type videoEventHookProps = {
    onEnd: ()=> void
    onPause:()=> void
    onResume:()=> void
    onStart:()=> void
}

type videoStateProps = {
    videoEvent?:any
    captureEvent?:any
}