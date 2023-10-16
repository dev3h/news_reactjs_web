import { Card, Form, Input, Button, message } from "antd";

import groupCategoryServices from "@/services/groupCategoryServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Edit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await groupCategoryServices.getOne(id);
        setData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (id, values) => {
    try {
      const response = await groupCategoryServices.update(id, values);
      message.success(response?.data?.message);
      form.resetFields();
      // focus on first input
      form.getFieldInstance("name").focus();
    } catch (error) {
      if (error?.response?.status === 422) {
        message.error(error?.response?.data?.message);
      }
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
        <Input hidden value={id} />
        <Form.Item
          label="Tên nhóm"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input autoFocus placeholder="Nhập tên nhóm" allowClear />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="bg-blue-400">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Edit;
