import axiosInstance from "../configs/axiosConfig";

class tagServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/tag", {
        params: {
          search,
          page: pagination?.defaultCurrent,
          sortBy: sort?.sortBy,
          sortType: sort?.sortType,
          flimit,
        },
      });
      const data = response?.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async create(data) {
    const response = await axiosInstance.post("/tag", data);
    return response;
  }
}

export default tagServices;
