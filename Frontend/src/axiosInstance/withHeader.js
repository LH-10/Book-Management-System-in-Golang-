import axios from "axios"

let jwtToken=localStorage.getItem("jwtToken")?localStorage.getItem("jwtToken"):null

const axiosWithAuthHeader=axios.create({
    headers:{
        Authorization:`Bearer ${jwtToken}`
    }
})
export {axiosWithAuthHeader}