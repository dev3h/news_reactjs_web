import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message, Button, Input, Divider } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import AdminAuthServices from "@/services/authServices/AdminAuthServices";
import { AdminContext } from "@/context/AdminContext";
import { ADMIN_FORM_FIELDS } from "@/validation/auth";

const ROLE_ROUTES = {
  ADMIN: "/admin/dashboard",
  AUTHOR: "/author/dashboard",
};

const SUPPORTED_ROLES = ["ADMIN", "AUTHOR"];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthData();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  const storeAuthData = (token) => {
    const authData = { token };
    const authString = JSON.stringify(authData);
    localStorage.setItem("admin", authString);
    setAdmin(authData);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await AdminAuthServices.login(values);
    if (response) {
      const role = await AdminAuthServices.checkRole(response?.accessToken);
      const roleName = role?.role_name;
      if (SUPPORTED_ROLES.includes(roleName)) {
        storeAuthData(response?.accessToken);
        message.success(response?.message);
        navigate(ROLE_ROUTES[roleName]);
      } else {
        clearAuthData();
        navigate("/auth/admin/login");
      }
    }
    setLoading(false);
  };

  const validateMessages = {
    required: "${label} là bắt buộc",
  };

  return (
    <div className="w-full">
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
        form={form}
        className="space-y-4"
      >
        <Form.Item
          label={<span className="text-gray-700 font-medium">Tên đăng nhập</span>}
          name="username"
          hasFeedback
          className="login-form-field"
          rules={ADMIN_FORM_FIELDS.username.rules}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Nhập tên đăng nhập"
            size="large"
            className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-all duration-200"
            autoComplete="username"
            maxLength="50"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-gray-700 font-medium">Mật khẩu</span>}
          name="password"
          hasFeedback
          className="login-form-field"
          rules={ADMIN_FORM_FIELDS.password.rules}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Nhập mật khẩu"
            size="large"
            className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-all duration-200"
            autoComplete="current-password"
            maxLength="20"
            allowClear
          />
        </Form.Item>
        <Form.Item className="mb-0 pt-4 login-form-field">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            icon={<LoginOutlined />}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 login-btn"
            style={{ height: "48px" }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </Button>
        </Form.Item>
        <Divider className="my-6">
          <span className="text-gray-400 text-sm">Hoặc</span>
        </Divider>
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            <span>Cần hỗ trợ?</span>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 ml-1 font-medium transition-colors duration-200"
            >
              Liên hệ admin
            </a>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
