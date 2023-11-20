import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import preventSpaceInput from "@/utils/preventSpaceInput";

const UserNameInput = ({ usernameValue = "", showIcon = true }) => {
  return (
    <Form.Item
      label="Tên đằng nhập"
      name="username"
      initialValue={usernameValue}
      hasFeedback
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input
        onKeyDown={(e) => preventSpaceInput(e)}
        prefix={showIcon && <UserOutlined />}
        placeholder="Nhập tên đăng nhập"
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
