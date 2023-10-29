import axios from "axios"

const API = axios.create({
    baseURL: "https://pixabay.com/api/",
    headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
    },
    params : {
        // key : process.env.REACT_PIXABAY_API_KEY,
        key : '40343383-4489e18d267dd59be7f34c713',
        image_type : "all",
        orientation : "vertical",
        min_height : 5
    },
})

export default API;