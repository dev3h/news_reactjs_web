import { useEffect, useState } from "react";
import { Card, Form, Input, Radio, message } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { ButtonAddForm } from "@/components/Btn/ButtonAddAndUpdateForm";
import EmailInput from "@/components/Input/EmailInput";
import roleServices from "@/services/adminServices/roleServices";

const Create = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState([]);
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
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await roleServices.getList();
        setRoleData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
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
          label="Tên hiển thị"
          name="display_name"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input autoFocus placeholder="Nhập tên hiển thị" allowClear />
        </Form.Item>
        <EmailInput showIcon={false} />
        <Form.Item label="Vai trò" name="role" hasFeedback>
          <Radio.Group>
            {roleData?.map((item) => (
              <Radio value={item?.id} key={item?.id}>
                {item?.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <ButtonAddForm loading={loading} />
      </Form>
    </Card>
  );
};

export default Create;
