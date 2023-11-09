import axiosInstance from "@/configs/axiosConfig";

class postServices {
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
  static async upload(loader) {
    try {
      const response = await axiosInstance.post(
        "/post/upload-photo",
        {
          photo: await loader.file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async deletePhoto(filename) {
    try {
      const response = await axiosInstance.post("/post/delete-photo/", {
        filename,
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getOne(id) {
    const response = await axiosInstance.get(`/post/${id}/info`);
    const data = response.data;
    return data;
  }
  static async getAllStatus() {
    const response = await axiosInstance.get(`/post/getAllStatus`);
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
