import postServices from "@/services/adminServices/postServices";
import { notification } from "antd";

const uploadImage = (loader) => {
  return {
    upload: async () => {
      try {
        const response = await postServices.upload(loader);
        return {
          default: response?.data?.path,
        };
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: error?.response?.data?.message,
        });
      }
    },
  };
};

export default uploadImage;
