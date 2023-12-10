import axiosInstance from "@/configs/axiosConfig";

class tagServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/tag", {
        params: {
          search: search?.trim(),
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
  static async getOne(id) {
    const response = await axiosInstance.get(`/tag/${id}/info`);
    const data = response.data;
    return data;
  }
  static async update(id, data) {
    const response = await axiosInstance.put(`/tag/${id}`, data);
    return response;
  }
  static async delete(id) {
    const response = await axiosInstance.delete(`/tag/${id}`);
    return response;
  }
}

export default tagServices;
