import axiosInstance from "@/configs/axiosUserConfig";

class groupServices {
  static async getCategoriesByGroup(slug) {
    try {
      const response = await axiosInstance.get(`/user/group/${slug}/categories`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getPostsByGroupAndCategory({
    groupSelected,
    categorySelected,
    pagination,
    sort,
    flimit,
  }) {
    try {
      const response = await axiosInstance.get(
        `/user/group/${groupSelected}/${categorySelected}/posts`,
        {
          params: {
            page: pagination?.defaultCurrent,
            sortBy: sort?.sortBy,
            sortType: sort?.sortType,
            flimit,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default groupServices;
