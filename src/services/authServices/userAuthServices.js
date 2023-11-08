import axiosInstance from "@/configs/axiosConfig";

class userAuthServices {
  static async login({ email, password }) {
    try {
      const response = await axiosInstance.post("/auth/user/login", {
        email,
        password,
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async register({ email, password }) {
    try {
      const response = await axiosInstance.post("/auth/user/register", {
        email,
        password,
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async verifyEmailRegister({ code }) {
    try {
      const response = await axiosInstance.put(`/auth/user/final-register/${code}`);
      const dataResponse = response.data;
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  }
  static async logout() {
    try {
      const response = await axiosInstance.get("/auth/user/logout");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async forgotPassword({ email }) {
    try {
      const response = await axiosInstance.get(
        `/auth/user/forgot-password?email=${email}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async resetPassword(inputData) {
    try {
      const response = await axiosInstance.put(`/auth/user/reset-password`, inputData);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserInfo() {
    try {
      const response = await axiosInstance.get("/auth/user/current");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default userAuthServices;
