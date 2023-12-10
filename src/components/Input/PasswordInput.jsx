import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import preventSpaceInput from "@/utils/preventSpaceInput";

const PasswordInput = ({ label, name, placeholder, isProfile = false }) => {
  const passwordRule = [
    {
      required: true,
    },
    {
      min: 8,
      message: `${label} phải có ít nhất 8 ký tự`,
    },
    {
      max: 20,
      message: `${label} phải có độ dài không được vượt quá 20 ký tự`,
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      message: `${label} phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt`,
    },
  ];
  const passwordConfirmRule = [
    {
      required: true,
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!isProfile) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(`${label} không khớp!`));
        } else {
          if (!value || getFieldValue("new_password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(`${label} không khớp!`));
        }
      },
    }),
  ];
  return isProfile ? (
    <Form.Item
      label={label}
      name={name}
      hasFeedback
      rules={name !== "confirm_new_password" ? passwordRule : passwordConfirmRule}
    >
      <Input.Password
        onKeyDown={(e) => preventSpaceInput(e)}
        prefix={<LockOutlined />}
        placeholder={placeholder}
        allowClear
      />
    </Form.Item>
  ) : (
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
  isProfile: PropTypes.bool,
};

export default PasswordInput;
