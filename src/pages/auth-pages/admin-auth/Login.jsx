import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import adminAuthServices from "@/services/authServices/adminAuthServices";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@/context/AdminContext";
import { useContext } from "react";
const Login = () => {
  const [form] = Form.useForm();
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const response = await adminAuthServices.login(values);
    if (response) {
      const admin = {
        token: response?.accessToken,
        data: response?.data,
      };
      const adminString = JSON.stringify(admin);
      localStorage.setItem("admin", adminString);
      setAdmin(admin);
      navigate("/admin/dashboard");
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <Form
      layout="vertical"
      validateMessages={validateMessages}
      onFinish={handleSubmit}
      form={form}
    >
      <Form.Item
        label="Username"
        name="username"
        hasFeedback
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input autoFocus prefix={<UserOutlined />} placeholder="Nhập Username" />
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
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
