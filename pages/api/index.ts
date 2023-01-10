import axios from "axios";
import { Readable } from 'stream';

export const auth = axios.create({baseURL:"http://localhost:4000" })

export const fetchBaseURL = "http://localhost:4000" ;

export const getWebCam = () => {
  
    return fetch(`${fetchBaseURL}/webcam`)

}

export const postWebCam = (data:any) => {

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    let formData = new FormData();

    formData.append("file",data)
    
    return auth.post("/webcam", formData ,axiosConfig )

}

export const getCaptureDisplay = () => {

    return auth.get("/display")
}

export const postCaptureDisplay = (data:any) => {

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    let formData = new FormData();

    formData.append("file",data)
    
    return auth.post("/display", formData ,axiosConfig )
}