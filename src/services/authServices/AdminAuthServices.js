import axiosInstance from "@/configs/axiosConfig";
import { AUTH_ENDPOINTS } from "@/configs/apiEndpoints";

class AdminAuthServices {
  static async login({ username, password }) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.ADMIN.LOGIN, {
        username,
        password,
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async refreshToken() {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.ADMIN.REFRESH_TOKEN);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async logout() {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN.LOGOUT);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async checkRole(accessToken) {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN.CHECK_ROLE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserInfo(accessToken) {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN.CURRENT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default AdminAuthServices;
