import { MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import preventSpaceInput from "@/utils/preventSpaceInput";

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
      <Input
        onKeyDown={(e) => preventSpaceInput(e)}
        prefix={showIcon && <MailOutlined />}
        placeholder="Nhập email"
        allowClear
      />
    </Form.Item>
  );
};
EmailInput.propTypes = {
  emailValue: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default EmailInput;
