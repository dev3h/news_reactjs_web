import { Card, Form, Input, Button, message } from "antd";

import groupCategoryServices from " @/services/adminServices/groupCategoryServices";
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
        const response = await groupCategoryServices.getOne(id);
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
      const response = await groupCategoryServices.update(id, rest);
      message.success(response?.data?.message);
      navigate("/admin/group-category");
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
        {data.name && (
          <>
            <Form.Item
              label="Tên nhóm"
              name="name"
              hasFeedback
              initialValue={data?.name}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoFocus placeholder="Nhập tên nhóm" allowClear />
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
