import axios from "axios";
import { notification } from "antd";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_API}/api/v1`,
  timeout: 10000,
  withCredentials: true,
});

// Interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("admin"))?.token;
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
    if (error?.response?.status === 401) {
      if (error?.response?.data?.authError) {
        notification.error({
          message: "Lỗi",
          description: error?.response?.data?.message,
        });
      } else {
        return Promise.reject(error);
      }
    } else if (error?.response?.status !== 422) {
      notification.error({
        message: "Lỗi",
        description: error?.response?.data?.message,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
