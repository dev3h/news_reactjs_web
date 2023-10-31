import axiosInstance from "@/configs/axiosConfig";

class categoryServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/category", {
        params: {
          search,
          page: pagination?.defaultCurrent,
          sortBy: sort?.sortBy,
          sortType: sort?.sortType,
          flimit,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getOne(id) {
    const response = await axiosInstance.get(`/category/${id}/info`);
    const data = response.data;
    return data;
  }
  static async create(data) {
    const response = await axiosInstance.post("/category", data);
    return response;
  }
  static async update(id, data) {
    const response = await axiosInstance.put(`/category/${id}`, data);
    return response;
  }
  static async delete(id) {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response;
  }
}

export default categoryServices;
