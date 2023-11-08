import axios from "axios";
import { notification } from "antd";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL_API}/api/v1/user`,
  timeout: 10000,
  withCredentials: true,
});
// // Hàm kiểm tra xem accessToken có hết hạn không
// const isAccessTokenExpired = (accessToken) => {
//   // chưa biết cách lấy thời gian sống của token
//   const expirationTime = new Date(accessToken.exp * 1000); // exp là thời gian hết hạn trong accessToken
//   console.log(expirationTime);
//   return new Date() >= expirationTime;
// };

// // Interceptor để thêm token vào header
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
//     if (accessToken && isAccessTokenExpired(accessToken)) {
//       try {
//         const response = await axiosInstance.post("/refresh-token");
//         console.log(response);

//         if (response.status === 200) {
//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem("admin", JSON.stringify({ token: newAccessToken }));
//           // Sau khi cập nhật accessToken, bạn có thể gửi lại yêu cầu gốc với accessToken mới
//           config.headers.Authorization = `Bearer ${newAccessToken}`;
//         } else {
//           // Xử lý lỗi khi không thể cập nhật accessToken
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// Interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
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
