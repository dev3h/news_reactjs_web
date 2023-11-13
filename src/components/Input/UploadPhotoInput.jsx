import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import PropTypes from "prop-types";

const UploadPhotoInput = ({ propUpload }) => {
  return (
    <Form.Item
      label="Ảnh bài viết"
      name="photo"
      hasFeedback
      rules={[
        {
          // format image file access extension jpg, jpeg, png
          validator: (_, value) => {
            if (value) {
              const file = value?.file;
              const maxSizeInMB = 5; // Kích thước tối đa cho phép, đơn vị MB
              const extensionList = ["jpg", "jpeg", "png"];

              // Kiểm tra kích thước file
              // do file thường do bằng byte nên cần chuyển sang MB
              const fileSizeInMB = file.size / 1024 / 1024;
              if (fileSizeInMB > maxSizeInMB) {
                return Promise.reject(
                  new Error(`File phải nhỏ hơn hoặc bằng ${maxSizeInMB}MB!`)
                );
              }
              let extension = value?.file?.name?.split(".")?.pop()?.toLowerCase();

              if (extensionList.includes(extension)) {
                return Promise.resolve();
              }
              extension = value?.file?.thumbUrl?.split(".")?.pop()?.toLowerCase();
              if (extensionList.includes(extension)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("File không đúng định dạng. Định dạng hỗ trợ: jpg, jpeg, png")
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Upload {...propUpload} listType="picture" maxCount={1}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Form.Item>
  );
};

UploadPhotoInput.propTypes = {
  propUpload: PropTypes.object,
};

export default UploadPhotoInput;
