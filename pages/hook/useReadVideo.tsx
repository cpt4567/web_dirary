
interface Props {
    api : (data: string) => Promise<Response>
    ref : any
}

export const useReadVideo = ({ api , ref } : Props ) => {


    const onReadVideo = async (fileName:string) => {

    const cam_res = await api(fileName);

    /*  const res = await getCaptureDisplay(fileName); */

     const { body } = cam_res ;
     
     if(body){
         
         const reader = body.getReader();

         let buffer = [];

             while (1) {
                 const { value, done } : any = await reader.read();
                 
                 if (done && ref.current) {
                   
                     const blob = new Blob(buffer);
                     
                     const blobUrl = URL.createObjectURL(blob);
                     
                     ref.current.src = blobUrl;

                     break;
                 }

                 buffer.push(value);
             }
         
         
     }
    }
    return [ onReadVideo ]
}