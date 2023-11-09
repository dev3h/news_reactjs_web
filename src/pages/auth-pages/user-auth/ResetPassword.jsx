import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, notification } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import PasswordInput from "@/components/Input/PasswordInput";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";
import EmailInput from "@/components/Input/EmailInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await userAuthServices.resetPassword(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
      navigate("/auth/login");
    }
    setLoading(false);
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  const passwordProps = {
    label: "Mật khẩu mới",
    name: "password",
    placeholder: "Nhập mật khẩu mới",
  };
  return (
    <>
      <h1>Reset mật khẩu</h1>
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item name="token" initialValue={token} hidden>
          <Input />
        </Form.Item>
        <EmailInput emailValue={email} />
        <PasswordInput {...passwordProps} />
        <ButtonSubmitForm loading={loading} title="Cập nhập mật khẩu" />
      </Form>
    </>
  );
};
export default ResetPassword;
