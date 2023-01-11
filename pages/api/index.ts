import axios from "axios";
import { Readable } from 'stream';
import { saveParamsProps } from "../../@types";

export const auth = axios.create({baseURL:"http://localhost:4000" })

export const fetchBaseURL = "http://localhost:4000" ;

export const getWebCam = () => {
  
    return fetch(`${fetchBaseURL}/webcam`)

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


export const getCaptureDisplay = () => {

    return fetch(`${fetchBaseURL}/display`)
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


export const getDisplayList = () => {

    return auth.get("/display_list")
}