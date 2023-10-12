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
    try {
      const response = await axiosInstance.get(`/group-category/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default groupCategoryServices;
