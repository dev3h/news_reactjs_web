import axiosInstance from "@/configs/axiosUserConfig";

class categoryServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/post", {
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
  static async getOne(slug) {
    try {
      const response = await axiosInstance.get(`/post/${slug}/detail`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default categoryServices;