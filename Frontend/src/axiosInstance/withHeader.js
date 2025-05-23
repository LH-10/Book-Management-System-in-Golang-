import axios from "axios"

let jwtToken=localStorage.getItem("jwtToken")?localStorage.getItem("jwtToken"):null

const axiosWithAuthHeader=axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export {axiosWithAuthHeader}