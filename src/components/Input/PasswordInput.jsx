import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import preventSpaceInput from "@/utils/preventSpaceInput";

const PasswordInput = ({ label, name, placeholder }) => {
  const passwordRule = [
    {
      required: true,
    },
    {
      min: 8,
      message: "Mật khẩu phải có ít nhất 8 ký tự!",
    },
    {
      max: 20,
      message: "Mật khẩu phải có tối đa 20 ký tự!",
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).*$/,
      message:
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt (@#$%^&+=)!",
    },
  ];
  const passwordConfirmRule = [
    {
      required: true,
      message: "Vui lòng xác nhận mật khẩu!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
      },
    }),
  ];
  return (
    <Form.Item
      label={label}
      name={name}
      hasFeedback
      rules={name === "password" ? passwordRule : passwordConfirmRule}
    >
      <Input.Password
        onKeyDown={(e) => preventSpaceInput(e)}
        prefix={<LockOutlined />}
        placeholder={placeholder}
        allowClear
      />
    </Form.Item>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default PasswordInput;
