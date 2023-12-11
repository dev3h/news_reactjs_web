import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const NameInput = ({ nameValue = "", showIcon = true, name = "username" }) => {
  const trimValue = (value) => value.trim();
  return (
    <Form.Item
      label="Name"
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
          message: "Name phải có ít nhất 3 ký tự",
        },
        {
          max: 50,
          message: "Name không cho phép nhập quá 50 ký tự",
        },
        {
          pattern:
            /^[a-zA-Z0-9\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđĐ]+$/i,
          message: "Name không được chứa ký tự đặc biệt!",
        },
      ]}
    >
      <Input prefix={showIcon && <UserOutlined />} placeholder="Nhập name" allowClear />
    </Form.Item>
  );
};
NameInput.propTypes = {
  nameValue: PropTypes.string,
  showIcon: PropTypes.bool,
  name: PropTypes.string,
};

export default NameInput;
