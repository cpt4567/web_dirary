import axios from "axios";
import { Readable } from 'stream';
import { saveParamsProps } from "../../@types";

export const auth = axios.create({baseURL:"http://localhost:4000" })

export const fetchBaseURL = "http://localhost:4000" ;

export const getWebCam = (data:string) => {
  
    const url = `${fetchBaseURL}/webcam/{fileName}`.replace("{fileName}",data)

    return fetch(url)

}

export const postWebCam = ( video : Blob , data : saveParamsProps ) => {

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    let formData = new FormData();

    formData.append("file",video)

    formData.append("obj",JSON.stringify(data) )
    
    return auth.post("/webcam", formData ,axiosConfig )

}

export const getWebcamList = () => {

    return auth.get("/webcam_list")
}

export const getCaptureDisplay = (data:string) => {

    const url = `${fetchBaseURL}/display/{fileName}`.replace("{fileName}",data)

    return fetch(url)
}

export const postCaptureDisplay = ( video : Blob , data : saveParamsProps ) => {

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    let formData = new FormData();

    formData.append("file",video)

    formData.append("obj", JSON.stringify(data) )
    
    return auth.post("/display", formData ,axiosConfig )
}


