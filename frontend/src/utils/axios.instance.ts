import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.constants";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axiosPublicInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosPrivateInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosPublicInstance.post("/auth/refresh-token");

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosPrivateInstance(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);
