import axios from "axios";

const api = axios.create({
    baseURL:'http://10.22.239.131:3333'
})

export {api};