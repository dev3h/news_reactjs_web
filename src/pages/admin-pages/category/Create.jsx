import { useEffect, useState } from "react";
import { Card, Form, Input, Button, message, Select } from "antd";

import groupCategoryServices from "@/services/groupCategoryServices";
import categoryServices from "@/services/categoryServices";

const Create = () => {
  const [form] = Form.useForm();
  const [groupCategoryDatas, setGroupCategoryDatas] = useState([]);
  const handleSubmit = async (values) => {
    try {
      const response = await categoryServices.create(values);
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
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await groupCategoryServices.getList();
        setGroupCategoryDatas(
          response?.rows?.map((item) => ({
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
  return (
    <Card>
      <Form
        validateMessages={validateMessages}
        className="w-full lg:w-1/2 xl:w-1/4"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          hasFeedback
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
