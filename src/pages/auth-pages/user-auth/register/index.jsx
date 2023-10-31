import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import userAuthServices from " @/services/authServices/userAuthServices";
import ConfirmRegisterCodeModal from "./ConfirmRegisterCodeModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const [confirmRegisterCodeModalVisible, setConfirmRegisterCodeModalVisible] =
    useState(false);
  const handleSubmit = async (values) => {
    const response = await userAuthServices.register(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
      setConfirmRegisterCodeModalVisible(true);
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <>
      <h1>Đăng ký</h1>
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
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
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Nhập Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
        <Form.Item>
          <span>
            Đã có tài khoản? <Link to={"/auth/login"}>Đăng nhập ngay</Link>
          </span>
        </Form.Item>
      </Form>
      <ConfirmRegisterCodeModal visible={confirmRegisterCodeModalVisible} />
    </>
  );
};
export default Register;
