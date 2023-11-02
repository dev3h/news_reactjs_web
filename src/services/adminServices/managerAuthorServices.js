import axiosInstance from "@/configs/axiosConfig";

class managerAuthorServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/manager-author", {
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
    const response = await axiosInstance.get(`/manager-author/${id}/info`);
    const data = response.data;
    return data;
  }
  static async create(data) {
    const response = await axiosInstance.post("/manager-author", data);
    return response;
  }
  static async update(id, data) {
    const response = await axiosInstance.put(`/manager-author/${id}`, data);
    return response;
  }
  static async delete(id) {
    const response = await axiosInstance.delete(`/manager-author/${id}`);
    return response;
  }
}

export default managerAuthorServices;
