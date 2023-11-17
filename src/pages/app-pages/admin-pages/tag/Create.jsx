import { useState } from "react";
import { Card, Form, Input, message } from "antd";

import tagServices from "@/services/adminServices/tagServices";
import { ButtonAddForm } from "@/components/Btn/ButtonAddAndUpdateForm";

const Create = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await tagServices.create(values);
      message.success(response?.data?.message);
      form.resetFields();
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
          label="Tên thẻ"
          name="name"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input autoFocus placeholder="Nhập tên thẻ" allowClear />
        </Form.Item>
        <ButtonAddForm loading={loading} />
      </Form>
    </Card>
  );
};

export default Create;
