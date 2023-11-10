import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Form, Input, Radio, message } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { ButtonUpdateForm } from "@/components/Btn/ButtonAddAndUpdateForm";
import EmailInput from "@/components/Input/EmailInput";
import roleServices from "@/services/adminServices/roleServices";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState([]);
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

  const handleSubmit = async (values) => {
    try {
      const { id, ...rest } = values;
      setLoading(true);
      const response = await managerAuthorServices.update(id, rest);
      message.success(response?.data?.message);
      setLoading(false);
      navigate("/admin/manager-author");
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
              label="Tên hiển thị"
              name="display_name"
              initialValue={data?.display_name}
              hasFeedback
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoFocus placeholder="Nhập tên hiển thị" allowClear />
            </Form.Item>
            <EmailInput emailValue={data?.email} showIcon={false} />
            <Form.Item label="Vai trò" name="role" hasFeedback initialValue={data?.role}>
              <Radio.Group>
                {roleData?.map((item) => (
                  <Radio value={item?.id} key={item?.id}>
                    {item?.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <ButtonUpdateForm loading={loading} />
          </>
        )}
      </Form>
    </Card>
  );
};

export default Edit;
