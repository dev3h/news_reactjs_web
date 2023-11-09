import { useState } from "react";
import { Form, notification } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";
import EmailInput from "@/components/Input/EmailInput";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await userAuthServices.forgotPassword(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
    }
    setLoading(false);
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <>
      <h1>Quên mật khẩu</h1>
      <Form validateMessages={validateMessages} onFinish={handleSubmit} form={form}>
        <EmailInput />
        <ButtonSubmitForm loading={loading} title="Gửi" />
      </Form>
    </>
  );
};
export default ForgotPassword;
