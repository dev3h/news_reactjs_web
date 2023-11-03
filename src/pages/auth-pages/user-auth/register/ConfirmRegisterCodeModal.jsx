import { Button, Form, Input, Modal, notification } from "antd";
import userAuthServices from "@/services/authServices/userAuthServices";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ConfirmRegisterCodeModal = ({ visible }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} là bắt buộc",
  };

  const handleSubmit = async ({ code }) => {
    const response = await userAuthServices.verifyEmailRegister({ code });
    if (response) {
      notification.success({
        message: "Thành công",
        description: response?.message,
      });
      navigate("/auth/login");
    }
  };
  return (
    <Modal open={visible} closable={false} footer={null}>
      <h3>Kiểm tra mail để lấy mã code</h3>
      <Form validateMessages={validateMessages} onFinish={handleSubmit} form={form}>
        <Form.Item
          name="code"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input allowClear autoFocus placeholder="Nhập mã xác thực" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ConfirmRegisterCodeModal.propTypes = {
  visible: PropTypes.bool,
};

export default ConfirmRegisterCodeModal;
