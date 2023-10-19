import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Form, Input, Button, message, Select } from "antd";

import categoryServices from "@/services/categoryServices";
import groupCategoryServices from "@/services/groupCategoryServices";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [groupCategoryDatas, setGroupCategoryDatas] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await categoryServices.getOne(id);
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
        const response = await groupCategoryServices.getList();
        setGroupCategoryDatas(
          response?.data?.map((item) => ({
            value: item?.id,
            label: item?.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const handleSubmit = async (values) => {
    try {
      const id = values.id;
      delete values.id;

      const response = await categoryServices.update(id, values);
      message.success(response?.data?.message);
      navigate("/admin/category");
    } catch (error) {
      if (error?.response?.status === 422) {
        message.error(error?.response?.data?.message);
      }
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
              label="Tên danh mục"
              name="name"
              hasFeedback
              initialValue={data?.name}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoFocus placeholder="Nhập tên danh mục" allowClear />
            </Form.Item>
            <Form.Item
              label="Nhóm"
              name="group_category_id"
              hasFeedback
              initialValue={data?.group_category_id}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn nhóm"
                optionFilterProp="children"
                filterOption={filterOption}
                options={groupCategoryDatas}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button htmlType="submit" type="primary" className="bg-blue-400">
            Cập nhập
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Edit;
