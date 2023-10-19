import axiosInstance from "../configs/axiosConfig";

class postServices {
  static async getList({ search, pagination, sort }) {
    try {
      const response = await axiosInstance.get("/post", {
        params: {
          search,
          page: pagination.defaultCurrent,
          sortBy: sort.sortBy,
          sortType: sort.sortType,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getOne(id) {
    const response = await axiosInstance.get(`/post/${id}`);
    const data = response.data;
    return data;
  }
  static async create(data) {
    const response = await axiosInstance.post("/post", data);
    return response;
  }
  static async update(id, data) {
    const response = await axiosInstance.put(`/post/${id}`, data);
    return response;
  }
  static async delete(id) {
    const response = await axiosInstance.delete(`/post/${id}`);
    return response;
  }
}

export default postServices;
