import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  // set token in the header for all the api call using axiosSecure hook
  instance.interceptors.request.use((config) => {
    console.log(config);
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  return instance;
};

export default UseAxiosSecure;
