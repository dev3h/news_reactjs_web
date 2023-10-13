import { Card, Form, Input, Button, message } from "antd";

import groupCategoryServices from "@/services/groupCategoryServices";

const Create = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await groupCategoryServices.create(values);
      message.success(response?.data?.message);
    } catch (error) {
      if (error?.response?.status === 422) {
        message.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <Card>
      <Form className="w-full lg:w-1/2 xl:w-1/4" onFinish={handleSubmit}>
        <Form.Item
          label="Tên nhóm"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhóm",
            },
          ]}
        >
          <Input placeholder="Nhập tên nhóm" allowClear />
          <small></small>
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

export default Create;
