import axios from "axios";
let axiosPublic = axios.create({
    baseURL: 'https://favorite-com-server-side-main.vercel.app'
})
const UseAxisosPublic = () => {
    return axiosPublic;
};

export default UseAxisosPublic;