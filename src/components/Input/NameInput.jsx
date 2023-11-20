import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";


const NameInput = ({ nameValue = "", showIcon = true }) => {
  return (
    <Form.Item
      label="Tên đằng nhập"
      name="username"
      initialValue={nameValue}
      hasFeedback
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input
        prefix={showIcon && <UserOutlined />}
        placeholder="Nhập tên đăng nhập"
        allowClear
       
      />
    </Form.Item>
  );
};
NameInput.propTypes = {
  nameValue: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default NameInput;
