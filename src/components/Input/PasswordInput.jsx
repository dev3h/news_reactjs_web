import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const PasswordInput = ({ label, name, placeholder }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      hasFeedback
      rules={[
        {
          required: true,
        },
        {
          min: 8,
          message: "Mật khẩu phải có ít nhất 8 ký tự!",
        },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$/,
          message:
            "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt (@#$%^&+=)!",
        },
      ]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder={placeholder} />
    </Form.Item>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default PasswordInput;
