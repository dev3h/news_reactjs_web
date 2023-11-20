import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, notification } from "antd";
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
        notification.success({
          message: response?.message,
        });
        navigate("/admin/dashboard");
      } else if (role?.role_name === "AUTHOR") {
        const author = {
          token: response?.accessToken,
          // data: response?.data,
        };
        const adminString = JSON.stringify(author);
        localStorage.setItem("admin", adminString);
        setAdmin(author);
        notification.success({
          message: response?.message,
        });
        navigate("/author/dashboard");
      } else {
        navigate("/auth/admin/login");
      }
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
