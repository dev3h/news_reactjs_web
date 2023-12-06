import axios from "axios";
import { notification } from "antd";
import axiosRetry from "axios-retry";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_API}/api/v1`,
  timeout: 10000,
  withCredentials: true,
});

// cấu hình retry
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => {
    // Thời gian chờ giữa các lần retry
    return retryCount * 1000;
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkError(error) || (error.response && error.response.status >= 500)
    );
  },
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
    if (axiosRetry.isNetworkError(error)) {
      notification.error({
        message: "Lỗi",
        description:
          "Thao tác không thành công do lỗi server/internet , vui lòng thử lại sau",
      });
    } else if (error?.response?.status === 401) {
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
