import { useEffect, useState } from "react";
import { Card, Form, Input, message, Select } from "antd";

import groupCategoryServices from "@/services/adminServices/groupCategoryServices";
import categoryServices from "@/services/adminServices/categoryServices";
import { ButtonAddForm } from "@/components/Btn/ButtonAddAndUpdateForm";

const Create = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [groupCategoryDatas, setGroupCategoryDatas] = useState([]);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await categoryServices.create(values);
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
            allowClear
          />
        </Form.Item>
        <ButtonAddForm loading={loading} />
      </Form>
    </Card>
  );
};

export default Create;
