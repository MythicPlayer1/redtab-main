import axios from "axios";
import { API, API1, API2 } from "./request";
import { useLoginStatusStore } from "../store/login-status-store/use-login-status-store";
import { useNavigate } from "react-router-dom";

const storage = localStorage.getItem("token-storage") ? JSON.parse(localStorage.getItem("token-storage") || "{}")?.state?.refreshToken : null;
const refreshToken = storage?.state?.refreshToken;
const accessToken = storage?.state?.accessToken;
const navigate = useNavigate();
console.log("refreshToken", refreshToken);

API.interceptors.request.use(
  (config) => {
     // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// so this is for the case when the accesToken is expired, we will use the refreshToken to get a new accesToken rather then asking the user to login again
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error", error)
    const originalRequest = error.config;
    const { setToken, isLoggedIn, setRefreshToken } = useLoginStatusStore.getState()
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("acess tooken is expired so we are trying to  use the refresh token to get a new access token......")
      originalRequest._retry = true;
      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refreshToken`, { refresh: refreshToken });
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;
          setToken(newAccessToken);
          setRefreshToken(newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
          console.log("error", error)
          if (isLoggedIn) {
            setToken("");
            setRefreshToken("");
            useLoginStatusStore.getState().setIsLoggedIn(false);
            navigate("/connect/phone")
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

// so this is for the case when the accesToken is expired, we will use the refreshToken to get a new accesToken rather then asking the user to login again
API1.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error", error)
    const originalRequest = error.config;
    const { setToken, isLoggedIn, setRefreshToken} = useLoginStatusStore.getState()
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("acess tooken is expired so we are trying to  use the refresh token to get a new access token......")
      originalRequest._retry = true;
      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refreshToken`, { refreshToken });
          const newAccessToken = response.data.access;
          setRefreshToken(response.data.refresh);
          setToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
          if (isLoggedIn) {
            setToken("");
            setRefreshToken("");
            useLoginStatusStore.getState().setIsLoggedIn(false);
            navigate("/connect/phone")
          }

        }
      }
    }
    return Promise.reject(error);
  }
);

// so this is for the case when the accesToken is expired, we will use the refreshToken to get a new accesToken rather then asking the user to login again
API2.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error", error)
    const originalRequest = error.config;
    const { setToken, isLoggedIn, setRefreshToken } = useLoginStatusStore.getState()
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("acess tooken is expired so we are trying to  use the refresh token to get a new access token......")
      originalRequest._retry = true;
      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refreshToken`, { refreshToken });
          const newAccessToken = response.data.access;
          setRefreshToken(response.data.refresh);
          setToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
          if (isLoggedIn) {
            setToken("");
            setRefreshToken("");
            useLoginStatusStore.getState().setIsLoggedIn(false);
            navigate("/connect/phone")
          }

        }
      }
    }
    return Promise.reject(error);
  }
);