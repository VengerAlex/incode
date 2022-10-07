import axios, { AxiosRequestConfig } from "axios";

export const getAuthUrl = (string: string) => `/auth/${string}`;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
