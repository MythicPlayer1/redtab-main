// @ts-nocheck
import axios from "axios";
import { useLoginStatusStore } from "../store/login-status-store/use-login-status-store";

let isRefreshing = false;
let failedQueue = [];

// Helper function to process the queued API requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// Function to get Authorization headers with the current access token
const getHeaders = () => {
  const accessToken = useLoginStatusStore.getState().accessToken;
  return accessToken
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    : { "Content-Type": "application/json" };
};

// Create the main API instance
export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: getHeaders(),
});

// Request interceptor to include the access token in API requests
API.interceptors.request.use(
  (config) => {
    const { accessToken } = useLoginStatusStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setToken, setRefreshToken, refreshToken, setIsLoggedIn } = useLoginStatusStore.getState();

    if ((error.response?.status === 401 || error.response?.status === 400) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const response = await RefreshAPI.post(`/authentication/refresh-token/`, { refresh: refreshToken });
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          setToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          resolve(axios(originalRequest));
        } catch (err) {
          processQueue(err, null);
          reject(err);
          setToken("");
          setRefreshToken("");
          setIsLoggedIn(false);
          sessionStorage.clear();
          localStorage.clear(); 
          window.location.href = '/connect/phone';
        } finally {
          isRefreshing = false;
        }
      });
    } 
    else if (error.response?.status === 403) {
      setToken("");
      setRefreshToken("");
      setIsLoggedIn(false);
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/connect/phone';
    }

    return Promise.reject(error);
  }
);

// Create another API instance for a different base URL (e.g., for booking APIs)
export const API2 = axios.create({
  baseURL: import.meta.env.VITE_BASE_BOOK_URL,
  headers: getHeaders(),
});

// Request interceptor for API2
API2.interceptors.request.use(
  (config) => {
    const { accessToken } = useLoginStatusStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for API2
API2.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setToken, setRefreshToken, refreshToken, setIsLoggedIn } = useLoginStatusStore.getState();

    if ((error.response?.status === 401 || error.response?.status === 400) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const response = await RefreshAPI.post(`/authentication/refresh-token/`, { refresh: refreshToken });
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          setToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          resolve(axios(originalRequest));
        } catch (err) {
          processQueue(err, null);
          reject(err);
          setToken("");
          setRefreshToken("");
          setIsLoggedIn(false);
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = '/connect/phone';
        } finally {
          isRefreshing = false;
        }
      });
    } 
    else if (error.response?.status === 403) {
      // Handle token blacklisted or other errors
      setToken("");
      setRefreshToken("");
      setIsLoggedIn(false);
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/connect/phone';
    }

    return Promise.reject(error);
  }
);

// Create the API1 instance for another base URL
export const API1 = axios.create({
  baseURL: import.meta.env.VITE_BASE_BOOK_URL,
  headers: getHeaders(),
});

// Request interceptor for API1
API1.interceptors.request.use(
  (config) => {
    const { accessToken } = useLoginStatusStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for API1
API1.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setToken, setRefreshToken, refreshToken, setIsLoggedIn } = useLoginStatusStore.getState();

    if ((error.response?.status === 401 || error.response?.status === 400) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const response = await RefreshAPI.post(`/authentication/refresh-token/`, { refresh: refreshToken });
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          setToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          resolve(axios(originalRequest));
        } catch (err) {
          processQueue(err, null);
          reject(err);
          setToken("");
          setRefreshToken("");
          setIsLoggedIn(false);
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = '/connect/phone';
        } finally {
          isRefreshing = false;
        }
      });
    } 
    else if (error.response?.status === 403) {
      // Handle token blacklisted or other errors
      setToken("");
      setRefreshToken("");
      setIsLoggedIn(false);
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/connect/phone';
    }

    return Promise.reject(error);
  }
);

// The RefreshAPI instance used to refresh tokens
export const RefreshAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
