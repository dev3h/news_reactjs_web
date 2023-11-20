import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, notification } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import ConfirmRegisterCodeModal from "./ConfirmRegisterCodeModal";
import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/PasswordInput";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";
import NameInput from "@/components/Input/NameInput";

const Register = () => {
  const [form] = Form.useForm();
  const [confirmRegisterCodeModalVisible, setConfirmRegisterCodeModalVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await userAuthServices.register(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
      setConfirmRegisterCodeModalVisible(true);
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
  const passwordConfirmProps = {
    label: "Nhập lại mật khẩu",
    name: "confirmPassword",
    placeholder: "Nhập lại mật khẩu",
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
        <EmailInput />
        <NameInput />
        <PasswordInput {...passwordProps} />
        <PasswordInput {...passwordConfirmProps} />

        <ButtonSubmitForm loading={loading} title="Đăng ký" />
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
