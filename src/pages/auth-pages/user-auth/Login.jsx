import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import { UserContext } from "@/context/UserContext";
import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/PasswordInput";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await userAuthServices.login(values);
    if (response) {
      const user = {
        token: response?.accessToken,
      };
      const userString = JSON.stringify(user);
      localStorage.setItem("user", userString);
      setUser(user);
      navigate("/");
    }
    setLoading(false);
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  const passwordProps = {
    label: "Mật khẩu",
    name: "password",
    placeholder: "Nhập mật khẩu",
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
