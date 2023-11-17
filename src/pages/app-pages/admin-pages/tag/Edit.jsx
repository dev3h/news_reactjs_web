import { Card, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import tagServices from "@/services/adminServices/tagServices";
import { ButtonUpdateForm } from "@/components/Btn/ButtonAddAndUpdateForm";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await tagServices.getOne(id);
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
      setLoading(true);
      const response = await tagServices.update(id, rest);
      message.success(response?.data?.message);
      setLoading(false);
      navigate("/admin/tag");
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
        <Form.Item name="id" initialValue={id} hidden>
          <Input />
        </Form.Item>
        {data.name && (
          <>
            <Form.Item
              label="Tên thẻ"
              name="name"
              hasFeedback
              initialValue={data?.name}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoFocus placeholder="Nhập tên thẻ" allowClear />
            </Form.Item>
            <ButtonUpdateForm loading={loading} />
          </>
        )}
      </Form>
    </Card>
  );
};

export default Edit;
