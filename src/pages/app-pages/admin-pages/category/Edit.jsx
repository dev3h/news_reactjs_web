import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Form, Input, message, Select } from "antd";

import categoryServices from "@/services/adminServices/categoryServices";
import groupCategoryServices from "@/services/adminServices/groupCategoryServices";
import { ButtonUpdateForm } from "@/components/Btn/ButtonAddAndUpdateForm";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (values) => {
    try {
      const { id, ...rest } = values;
      setLoading(true);
      const response = await categoryServices.update(id, rest);
      message.success(response?.data?.message);
      setLoading(false);
      navigate("/admin/category");
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
        {data?.name && (
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
                allowClear
              />
            </Form.Item>
            <ButtonUpdateForm loading={loading} />
          </>
        )}
      </Form>
    </Card>
  );
};

export default Edit;
