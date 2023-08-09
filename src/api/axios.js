import axios from "axios";

const instance = axios.create({
    baseURL: "http://15.164.167.59/",
})


export default instance;