import axios from "axios";
import { notification } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 10000,
});

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
