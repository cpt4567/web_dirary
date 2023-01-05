
import { SxProps } from '@mui/system';
import { red , blue ,purple } from '@mui/material/colors';
import { Fab, Theme, Zoom } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useMemo } from 'react';
interface Props {
    value : number
    theme : Theme
    event : videoEventProps
    state ? : videoStateProps
}

export default function Icon( { value , theme , event , state } : Props ) {
    

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      };

    const videoFabs = {
        
        add:{
            sx:{
                position: 'absolute',
                bottom: 36,
                right: 56,
                color: 'common.white',
                bgcolor: purple[500],
                '&:hover': {
                  bgcolor: purple[600],
                }
            },
            event:event.onAdd,
            Icon:<AddCircleIcon/>

        },
        start:{
            sx:{
                position: 'absolute',
                bottom: 36,
                right: 56,
                color: 'common.white',
                bgcolor: red[500],
                '&:hover': {
                  bgcolor: red[600],
                }
            },
            event:event.onStart,
            Icon:<PlayArrowIcon/>

        },
        resume:{
            sx:{
                position: 'absolute',
                bottom: 36,
                right: 56,
                color: 'common.white',
                bgcolor: red[500],
                '&:hover': {
                  bgcolor: red[600],
                }
            },
            event:event.onResume,
            Icon:<PlayArrowIcon/>

        },
        pause:{
            sx: {
                position: 'absolute',
                bottom: 36,
                right: 126,
                color: 'common.white',
                bgcolor: blue[500],
                '&:hover': {
                  bgcolor: blue[600],
                }
            },
            event:event.onPause,
            Icon:<PauseCircleFilledIcon/>
        },
        end:{
            sx:{
                position: 'absolute',
                bottom: 36,
                right: 196,
                color: 'common.white',
                bgcolor: blue[700],
                '&:hover': {
                  bgcolor: blue[800],
                }
            },
            event:event.onEnd,
            Icon:<StopCircleIcon/>
        }
    }

    const videoFabsRenderer = () => {
        
        if(state){

            const { videoEvent , captureEvent } = state ;
            
            if( !videoEvent && !captureEvent ) {
                
                return (
                <Zoom
                    in={value === 0}
                    timeout={transitionDuration}
                    style={{transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`}}
                    unmountOnExit
                >
            
                <Fab sx={videoFabs.add.sx} onClick={videoFabs.add.event}>
                  {videoFabs.add.Icon}
                </Fab>

            </Zoom>
            )
            }

            else if(videoEvent && captureEvent){

                const startData = Object.entries(videoFabs).filter(([ key , _ ])=> key !== "start" && key !== "add" && key !== "resume" )
                const pauseData = Object.entries(videoFabs).filter(([ key , _ ])=> key !== "start" && key !== "add" )                

                const { state : videoState } = videoEvent
                const { state : captureState } = captureEvent
                
                    if( videoState === "inactive" && captureState === "inactive" ){
                        return (
                        <Zoom
                            in={value === 0}
                            timeout={transitionDuration}
                            style={{transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`}}
                            unmountOnExit
                        >
                    
                            <Fab sx={videoFabs.start.sx} onClick={videoFabs.start.event}>
                              {videoFabs.start.Icon}
                            </Fab>
        
                        </Zoom>
                        )
                    }
                    else if( videoState === "paused" && captureState === "paused"){
                        return (
                            <>
                            { pauseData.map(([_key,_value],index)=> 
                            <Zoom
                              key={index}
                              in={value === 0}
                              timeout={transitionDuration}
                              style={{transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`}}
                             unmountOnExit
                            >
                            
                                <Fab sx={_value.sx} onClick={_value.event}>{_value.Icon}</Fab>
                
                            </Zoom>
                            )}
                            </>)
                    }

                    else{
                        return (
                        <>
                        { startData.map(([_key,_value],index)=> 
                        <Zoom
                          key={index}
                          in={value === 0}
                          timeout={transitionDuration}
                          style={{transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`}}
                         unmountOnExit
                        >
                        
                            <Fab sx={_value.sx} onClick={_value.event}>{_value.Icon}</Fab>
            
                        </Zoom>
                        )}
                        </>)
                    }

            }
            
        }
        

        return <></>
    }


    return (
        <>
            {value === 0 && videoFabsRenderer() }
        </>
    )

}