import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // set token in the header for all the api call using axiosSecure hook
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // console.log(config);
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      // config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        // console.log("inside the useAxios", status);
        if (status === 401 || status === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return instance;
};

export default UseAxiosSecure;
