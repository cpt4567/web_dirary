import axios from "axios";

export const auth = axios.create({baseURL:"localhost:4000" })


export const getWebCam = () => {

    return auth.get("/webcam")
    
}

const postWebCam = (data:any) => {

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    let formData = new FormData();

    formData.append("file",data)
    
    return auth.post("/webcam", formData ,axiosConfig )

}

const getCaptureDisplay = () => {

    return auth.get("/display")
}

const postCaptureDisplay = (data:any) => {

    let axiosConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }

    let formData = new FormData();

    formData.append("file",data)
    
    return auth.post("", formData ,axiosConfig )
}