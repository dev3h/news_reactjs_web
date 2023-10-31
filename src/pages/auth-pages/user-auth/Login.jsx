import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import userAuthServices from " @/services/authServices/userAuthServices";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Login = () => {
  const [form] = Form.useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const response = await userAuthServices.login(values);
    if (response) {
      const user = {
        token: response?.accessToken,
        data: response?.data,
      };
      const userString = JSON.stringify(user);
      localStorage.setItem("user", userString);
      setUser(user);
      navigate("/");
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <>
      <h1>Đăng nhập</h1>
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
          <Link to={"/auth/forgot-password"}>Quên mật khẩu?</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <span>
            Chưa có tài khoản? <Link to={"/auth/register"}>Tạo tài khoản</Link>
          </span>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
