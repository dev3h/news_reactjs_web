import axiosInstance from "@/configs/axiosUserConfig";

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
  static async register({ email, password, name }) {
    try {
      const response = await axiosInstance.post("/auth/user/register", {
        email,
        password,
        name,
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
  static async updatePassword(inputData) {
    try {
      const response = await axiosInstance.put(`/auth/user/update-password`, inputData);

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async refreshToken() {
    try {
      const response = await axiosInstance.post("/auth/user/refresh-token");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserInfo(accessToken) {
    return axiosInstance
      .get("/auth/user/current", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default userAuthServices;
