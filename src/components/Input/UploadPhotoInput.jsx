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
              let extension = value?.file?.name?.split(".")?.pop()?.toLowerCase();

              const extensionList = ["jpg", "jpeg", "png"];
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
