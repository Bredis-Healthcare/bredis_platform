import axios from "axios";

const instance = axios.create({
    baseURL: "http://15.164.167.59/",
})

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                default:
                    window.alert(error.response.data.message)
                    return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

export default instance;