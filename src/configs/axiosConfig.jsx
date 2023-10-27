import axios from "axios";
import { notification } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 10000,
  withCredentials: true,
});

// Interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status !== 422) {
      notification.error({
        message: "Lỗi",
        description: error?.response?.data?.message,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
