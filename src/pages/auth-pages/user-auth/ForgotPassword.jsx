import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const response = await userAuthServices.forgotPassword(values);
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      form.resetFields();
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <>
      <h1>Quên mật khẩu</h1>
      <Form validateMessages={validateMessages} onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Email"
          name="email"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ForgotPassword;
