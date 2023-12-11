import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, notification } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import PasswordInput from "@/components/Input/PasswordInput";
import ButtonSubmitForm from "@/components/Btn/ButtonSubmitForm";
import { UserContext } from "@/context/UserContext";

const PasswordUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
  const passwordProps = {
    label: "Mật khẩu hiện tại",
    name: "password",
    placeholder: "Nhập mật khẩu hiện tại",
    isProfile: true,
  };
  const newPasswordProps = {
    label: "Mật khẩu mới",
    name: "new_password",
    placeholder: "Nhập mật khẩu mới",
    isProfile: true,
  };
  const confirmNewPasswordProps = {
    label: "Xác nhận mật khẩu mới",
    name: "confirm_new_password",
    placeholder: "Nhập lại mật khẩu mới",
    isProfile: true,
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    const response = await userAuthServices.updatePassword(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
    }
    setLoading(false);
  };
  return (
    <Card
      title="Cập nhập mật khẩu"
      bordered={false}
      className="w-1/2 mt-[30px] h-fit p-9 mx-auto"
    >
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
        form={form}
      >
        <PasswordInput {...passwordProps} />
        <PasswordInput {...newPasswordProps} />
        <PasswordInput {...confirmNewPasswordProps} />
        <ButtonSubmitForm loading={loading} title="Cập nhập" />
      </Form>
    </Card>
  );
};

export default PasswordUpdate;
