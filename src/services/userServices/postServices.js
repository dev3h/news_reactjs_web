import axiosInstance from "@/configs/axiosUserConfig";

class postServices {
  static async getList({ search, pagination, sort, flimit } = {}) {
    try {
      const response = await axiosInstance.get("/user/post", {
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
      const response = await axiosInstance.get(`/user/post/${slug}/detail`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async toggleLike(slug) {
    try {
      const response = await axiosInstance.put(`/user/post/${slug}/like`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createComment(slug, content) {
    try {
      const response = await axiosInstance.post(`/user/post/${slug}/comment`, content);
      const dataResponse = response.data;
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  }
  static async increaseViewOfPost(slug, ip) {
    try {
      const response = await axiosInstance.post(`/user/post/${slug}/increase-view`, {
        ip,
      });
      const dataResponse = response.data;
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  }
  static async getGroupPost() {
    try {
      const response = await axiosInstance.get("/user/post/post-of-group");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getGroupCategories() {
    try {
      const response = await axiosInstance.get("/user/post/group-category");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default postServices;
