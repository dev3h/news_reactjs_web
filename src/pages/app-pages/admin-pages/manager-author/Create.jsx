import { useState } from "react";
import { Card, Form, Input, message } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { ButtonAddForm } from "@/components/Btn/ButtonAddAndUpdateForm";

const Create = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await managerAuthorServices.create(values);
      message.success(response?.data?.message);
      form.resetFields();
      // focus on first input
      form.getFieldInstance("name").focus();
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 422) {
        message.error(error?.response?.data?.message);
      }
      setLoading(false);
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <Card>
      <Form
        validateMessages={validateMessages}
        className="w-full lg:w-1/2 xl:w-1/4"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input autoFocus placeholder="Nhập tên đăng nhập" allowClear />
        </Form.Item>
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
          <Input autoFocus placeholder="Nhập email" allowClear />
        </Form.Item>
        <ButtonAddForm loading={loading} />
      </Form>
    </Card>
  );
};

export default Create;
