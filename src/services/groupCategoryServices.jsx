import axiosInstance from "../configs/axiosConfig";

class groupCategoryServices {
  static async getList({ search, pagination, sort }) {
    try {
      const response = await axiosInstance.get("/group-category", {
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
    const response = await axiosInstance.get(`/group-category/${id}`);
    const data = response.data;
    return data;
  }
  static async create(data) {
    const response = await axiosInstance.post("/group-category", data);
    return response;
  }
}

export default groupCategoryServices;
