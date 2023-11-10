import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const EmailInput = ({ emailValue = "", showIcon = true }) => {
  return (
    <Form.Item
      label="Email"
      name="email"
      initialValue={emailValue}
      hasFeedback
      rules={[
        {
          required: true,
        },
        {
          type: "email",
          message: "Email không hợp lệ",
        },
      ]}
    >
      <Input prefix={showIcon && <UserOutlined />} placeholder="Nhập email" allowClear />
    </Form.Item>
  );
};
EmailInput.propTypes = {
  emailValue: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default EmailInput;
