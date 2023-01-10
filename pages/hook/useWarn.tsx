import { useState } from "react"
import Warn from "../../components/warn"

type returnType = [ warmRenderer : JSX.Element ,openwarm: ()=> void  ]

export const useWarn = () : returnType => {

    const [open, setOpen] = useState<boolean>(false)


    const onwarmOpen = ()  => {

        setOpen (true)
    }

    const onwarmClose = ()  => {

        setOpen (false)
    }



    const WarnRenderer  =() => {

        return (<Warn open={open} onClose={onwarmClose} />)
    }


    return  [ <WarnRenderer key={0} /> , onwarmOpen ]
}