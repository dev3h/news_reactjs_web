import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const EmailInput = ({ emailValue = "" }) => {
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
      <Input autoFocus prefix={<UserOutlined />} placeholder="Nhập email" />
    </Form.Item>
  );
};
EmailInput.propTypes = {
  emailValue: PropTypes.string,
};

export default EmailInput;
