import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.bredis.co.kr/",
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