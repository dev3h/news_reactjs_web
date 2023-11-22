import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import preventSpaceInput from "@/utils/preventSpaceInput";

const UserNameInput = ({ usernameValue = "", showIcon = true }) => {
  return (
    <Form.Item
      label="Username"
      name="username"
      initialValue={usernameValue}
      hasFeedback
      rules={[
        {
          required: true,
        },
        {
          min: 3,
          message: "Username phải có ít nhất 3 ký tự!",
        },
        {
          max: 20,
          message: "Username phải có tối đa 20 ký tự!",
        },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: "Username không được chứa ký tự đặc biệt!",
        },
      ]}
    >
      <Input
        onKeyDown={(e) => preventSpaceInput(e)}
        prefix={showIcon && <UserOutlined />}
        placeholder="Nhập username"
        allowClear
      />
    </Form.Item>
  );
};
UserNameInput.propTypes = {
  usernameValue: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default UserNameInput;
