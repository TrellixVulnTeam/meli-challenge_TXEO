import axios from "axios";

const client = axios.create({
    baseURL: "https://meli-challenge-gil-api.herokuapp.com/"
});

export default client;