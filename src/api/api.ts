import axios from "axios";

const client = axios.create({
    baseURL: "https://valorant-api.com/v1"
})

export default client;