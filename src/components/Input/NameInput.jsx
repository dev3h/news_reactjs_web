import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const NameInput = ({ nameValue = "", showIcon = true, name = "username" }) => {
  const trimValue = (value) => value.trim();
  return (
    <Form.Item
      label="Tên hiển thị"
      name={name}
      initialValue={nameValue}
      hasFeedback
      rules={[
        {
          required: true,
          transform: trimValue,
        },
        {
          min: 3,
          message: "Tên hiển thị phải có ít nhất 3 ký tự!",
        },
        {
          max: 50,
          message: "Tên hiển thị phải có tối đa 50 ký tự!",
        },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: "Username không được chứa ký tự đặc biệt!",
        },
      ]}
    >
      <Input
        prefix={showIcon && <UserOutlined />}
        placeholder="Nhập tên hiển thị"
        allowClear
      />
    </Form.Item>
  );
};
NameInput.propTypes = {
  nameValue: PropTypes.string,
  showIcon: PropTypes.bool,
  name: PropTypes.string,
};

export default NameInput;
