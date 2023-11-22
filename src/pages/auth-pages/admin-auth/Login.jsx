import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import adminAuthServices from "@/services/authServices/adminAuthServices";
import { AdminContext } from "@/context/AdminContext";
import PasswordInput from "@/components/Input/PasswordInput";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";
import UserNameInput from "@/components/Input/UserNameInput";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("admin");
    setAdmin(null);
  }, []);
  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await adminAuthServices.login(values);
    if (response) {
      const role = await adminAuthServices.checkRole(response?.accessToken);
      if (role?.role_name === "ADMIN") {
        const admin = {
          token: response?.accessToken,
          // data: response?.data,
        };

        const adminString = JSON.stringify(admin);
        localStorage.setItem("admin", adminString);
        setAdmin(admin);
        message.success(response?.message);
        navigate("/admin/dashboard");
      } else if (role?.role_name === "AUTHOR") {
        const author = {
          token: response?.accessToken,
          // data: response?.data,
        };
        const adminString = JSON.stringify(author);
        localStorage.setItem("admin", adminString);
        setAdmin(author);
        message.success(response?.message);
        navigate("/author/dashboard");
      } else {
        localStorage.removeItem("admin");
        setAdmin(null);
        navigate("/auth/admin/login");
      }
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
    <Form
      layout="vertical"
      validateMessages={validateMessages}
      onFinish={handleSubmit}
      form={form}
    >
      <UserNameInput />
      <PasswordInput {...passwordProps} />

      <ButtonSubmitForm loading={loading} title="Đăng nhập" />
    </Form>
  );
};

export default Login;
