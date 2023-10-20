import axiosInstance from "../configs/axiosConfig";

class groupCategoryServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/group-category", {
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
  static async getOne(id) {
    const response = await axiosInstance.get(`/group-category/${id}/info`);
    const data = response.data;
    return data;
  }
  static async create(data) {
    const response = await axiosInstance.post("/group-category", data);
    return response;
  }
  static async update(id, data) {
    const response = await axiosInstance.put(`/group-category/${id}`, data);
    return response;
  }
  static async delete(id) {
    const response = await axiosInstance.delete(`/group-category/${id}`);
    return response;
  }
}

export default groupCategoryServices;
