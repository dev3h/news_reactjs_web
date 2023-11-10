import axiosInstance from "@/configs/axiosConfig";

class roleServices {
  static async getList() {
    try {
      const response = await axiosInstance.get("/role");
      const data = response?.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default roleServices;
