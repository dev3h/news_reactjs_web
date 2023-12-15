import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/PasswordInput";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";
import { useUserAuthStore } from "@/stores/user-store/UserStore";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setToken } = useUserAuthStore();
  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await userAuthServices.login(values);
    if (response) {
      const user = {
        token: response?.accessToken,
      };
      const userString = JSON.stringify(user);
      localStorage.setItem("user", userString);
      // setUser(user);
      setToken(response?.accessToken);
      message.success(response?.message);
      navigate("/");
    }
    setLoading(false);
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  const passwordProps = {
    label: "Password",
    name: "password",
    placeholder: "Nhập password",
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
        <EmailInput />
        <PasswordInput {...passwordProps} />
        <Form.Item>
          <Link to={"/auth/forgot-password"}>Quên mật khẩu?</Link>
        </Form.Item>

        <ButtonSubmitForm loading={loading} title="Đăng nhập" />
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
