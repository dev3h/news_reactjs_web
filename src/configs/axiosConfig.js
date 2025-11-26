import axios from "axios";
import { notification } from "antd";
import AdminAuthServices from "../services/authServices/AdminAuthServices";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_API}/api/v1`,
  timeout: 10000,
  withCredentials: true,
});

// Thêm biến để quản lý refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Cleanup khi window unload để tránh memory leak
if (typeof window !== "undefined") {
  window.addEventListener('beforeunload', () => {
    isRefreshing = false;
    failedQueue = [];
  });
}

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
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error?.code === "ERR_NETWORK") {
      notification.error({
        message: "Lỗi",
        description:
          "Thao tác không thành công do lỗi server/internet , vui lòng thử lại sau",
      });
    } else {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.cause === 'JsonWebTokenError') {
          localStorage.removeItem("admin");
          notification.warning({
            message: 'Phiên đăng nhập hết hạn',
            description: 'Vui lòng đăng nhập lại'
          });
          globalThis.location.reload();
        }
        else if (error?.response?.data?.authError) {
          notification.error({
            message: "Lỗi",
            description: error?.response?.data?.message,
          });
        } else {
          // Handle refresh tokens with queue
          if (originalRequest._retry) {
            return Promise.reject(error);
          }

          if (isRefreshing) {
            // If refreshing, add request to queue
            // to handle other requests that need the new token
            // other requests will wait until the token is refreshed
            return new Promise(function(resolve, reject) {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            }).catch(err => {
              throw err;
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const response = await AdminAuthServices.refreshToken();
            const token = response?.accessToken;

            if (token) {
              const authData = { token };
              const authString = JSON.stringify(authData);
              localStorage.setItem("admin", authString);

              // Cập nhật header cho request hiện tại
              originalRequest.headers.Authorization = `Bearer ${token}`;

              // Xử lý tất cả requests đang chờ
              processQueue(null, token);

              // Retry request ban đầu
              return axiosInstance(originalRequest);
            } else {
              throw new Error('No token received');
            }
          } catch (refreshError) {
            processQueue(refreshError, null);
            failedQueue = []; // Clear queue on error
            localStorage.removeItem("admin");
            globalThis.location.reload();
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }
      } else if (error?.response?.status !== 422) {
        notification.error({
          message: "Lỗi",
          description: error?.response?.data?.message,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;