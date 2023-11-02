import { Card, Form, Input, Button, message } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await managerAuthorServices.getOne(id);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const { id, ...rest } = values;
      const response = await managerAuthorServices.update(id, rest);
      message.success(response?.data?.message);
      navigate("/admin/manager-author");
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
        <Form.Item name="id" initialValue={id} hidden>
          <Input />
        </Form.Item>
        {data.username && (
          <>
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              hasFeedback
              initialValue={data?.username}
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
              initialValue={data?.email}
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
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Cập nhập
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </Card>
  );
};

export default Edit;
