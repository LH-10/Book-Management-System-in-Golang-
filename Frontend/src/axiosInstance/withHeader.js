import axios from "axios"


function checkForToken(){
    if (localStorage.getItem("jwtToken")){
        return `Bearer ${localStorage.getItem("jwtToken")}`
    }
    else {
        return null
    }
}

const axiosWithAuthHeader=axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export {axiosWithAuthHeader}