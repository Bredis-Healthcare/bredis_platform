import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: "https://api.bredis.co.kr/",
})


let handleUnauthorized;

instance.interceptors.request.use(
    function (config) {
    
        // console.log("axios", config.url!=='login', config.url, Cookies.get('login'), Cookies.get(), Cookies.get('login'), (config.url==='login'&& Object.keys(config.data).length === 0))
        
        if ( Cookies.get('login') ) {
            const authorization = JSON.parse(Cookies.get('login'));
            console.log("auth", authorization["authToken"])

            config.headers = {
                ...config.headers,
                Authorization: authorization["authToken"]
            }
        }
        else{
            if( config.url==='login' || config.url==='register')
            {
                // console.log("!")
            }
            else{
                // console.log("!s")
                handleUnauthorized();
                throw new Error("Error");
            }
        }
        return config;    
        
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
        
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    if (handleUnauthorized) {
                        handleUnauthorized();
                    }
                    return Promise.resolve();
                case 403:
                    window.alert(error.response.data.message);
                    window.location.replace("/");
                    return Promise.resolve();
                default:
                    window.alert(error.response.data.message);
                    return Promise.resolve();
            }
        }
        return Promise.reject(error);
    },
);

export const setUnauthorizedHandler = (handler) => {
    handleUnauthorized = handler;
};


export default instance;