import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import userAuthServices from "@/services/authServices/userAuthServices";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (values) => {
    const response = await userAuthServices.resetPassword(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
      navigate("/auth/login");
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
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
        <Form.Item
          label="Email"
          name="email"
          initialValue={email}
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
          label="Mật khẩu mới"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password
            autoFocus
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu mới"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhập mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ResetPassword;
