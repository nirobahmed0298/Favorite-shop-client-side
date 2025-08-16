import axios from "axios";
let axiosPublic = axios.create({
    baseURL: 'http://localhost:5001'
})
const UseAxisosPublic = () => {
    return axiosPublic;
};

export default UseAxisosPublic;