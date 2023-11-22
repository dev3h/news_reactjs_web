import { useContext, useEffect, useState } from "react";
import { Card, Form, Input, message, Select, Radio, DatePicker, Flex } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import categoryServices from "@/services/adminServices/categoryServices";
import postServices from "@/services/adminServices/postServices";
import tagServices from "@/services/adminServices/tagServices";
import uploader from "@/utils/createUploader";
import { AdminContext } from "@/context/AdminContext";
import { ButtonAddForm } from "@/components/Btn/ButtonAddAndUpdateForm";
import UploadPhotoInput from "@/components/Input/UploadPhotoInput";

const Create = () => {
  const [form] = Form.useForm();
  const { admin } = useContext(AdminContext);
  const accessToken = admin?.token;
  const [loading, setLoading] = useState(false);
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [editorError, setEditorError] = useState("");
  const maxContentLength = 1000;
  const [tagsDatas, setTagsDatas] = useState([]);
  const [statusPostDatas, setStatusPostDatas] = useState([]);
  const [statusPostSelected, setStatusPostSelected] = useState(0);
  const [fileList, setFileList] = useState([]);
  const ckeditorConfig = {
    extraPlugins: [uploader],
  };
  const validateEditorContent = (value) => {
    console.log(value && value.trim().length > 0);
    return value && value.trim().length > 0 ? undefined : "Nội dung là bắt buộc";
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();

    const requiredError = validateEditorContent(data);
    if (requiredError) {
      setEditorError(requiredError);
    } else {
      if (data.length <= maxContentLength) {
        setEditorContent(data);
        setEditorError("");
      } else {
        setEditorError("Nội dung không được vượt quá 1000 ký tự.");
      }
    }
  };

  const propUpload = {
    name: "photo",
    multiple: false,
    action: `${import.meta.env.VITE_BASE_URL_API}/api/v1/post/upload-photo`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    fileList: fileList,
    async onChange(info) {
      // Note cần làm: khi xóa thì phải xóa cả ở trên cloudinary
      let newFileList = [...info.fileList];

      // Giới hạn chỉ cho một tệp tin
      newFileList = newFileList.slice(-1);
      if (info.file.status === "removed") {
        setFileList([]);
        const file = info.file?.response?.data;
        if (file) {
          await postServices.deletePhoto(file?.filename);
        }
      } else {
        setFileList(newFileList);
      }
    },
  };
  const handleSubmit = async (values) => {
    try {
      if (fileList.length === 0) {
        delete values.photo;
      }
      values.content = editorContent;
      setLoading(true);
      const response = await postServices.create(values);
      message.success(response?.data?.message);
      form.resetFields();
      setEditorContent("");
      setFileList([]);
      // focus on first input
      form.getFieldInstance("title").focus();
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
  const handleChangeStatusPost = (e) => {
    setStatusPostSelected(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await categoryServices.getList();
        setCategoryDatas(
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await postServices.getAllStatus();
        setStatusPostDatas(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await tagServices.getList();
        setTagsDatas(
          response?.rows?.map((item) => ({
            value: item?.id?.toString(),
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
        className="w-full lg:w-1/2"
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          hasFeedback
          rules={[
            {
              required: true,
            },
            {
              min: 5,
              message: "Tiêu đề phải có ít nhất 5 ký tự",
            },
            {
              max: 100,
              message: "Tiêu đề phải có nhiều nhất 100 ký tự",
            },
          ]}
        >
          <Input autoFocus placeholder="Nhập tiêu đề" allowClear />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          hasFeedback
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
          validateStatus={editorError ? "error" : ""}
          help={editorError}
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            config={ckeditorConfig}
            onChange={handleEditorChange}
          />
        </Form.Item>
        <Form.Item
          label="Lưu hoặc xuất bản hoặc lên lịch"
          name="status"
          hasFeedback
          initialValue={statusPostSelected}
        >
          <Radio.Group onChange={handleChangeStatusPost}>
            {statusPostDatas?.map((item) => (
              <Radio value={item?.id} key={item?.id}>
                {item?.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {statusPostSelected === statusPostDatas[2]?.id && (
          <Form.Item
            label="Ngày xuất bản"
            name="published_at"
            hasFeedback
            rules={[
              {
                required: true,
              },
              {
                validator: (_, value) => {
                  // lấy thời gian hiện tại
                  const currentDate = new Date();

                  if (!value || value >= currentDate) {
                    // Nếu ngày không tồn tại hoặc lớn hơn hoặc bằng ngày hiện tại
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Ngày xuất bản phải lớn hơn hoặc bằng ngày hiện tại."
                  );
                },
              },
            ]}
          >
            <DatePicker
              placeholder="Chọn ngày xuất bản"
              format="YYYY-MM-DD HH:mm:ss"
              showTime
            />
          </Form.Item>
        )}
        <Flex gap="small" wrap="wrap" className="flex-col md:flex-row">
          <Form.Item
            label="Danh mục"
            name="category_id"
            className="flex-1"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              filterOption={filterOption}
              options={categoryDatas}
              allowClear
            />
          </Form.Item>
          <Form.Item className="flex-1" label="Thẻ" name="tags" hasFeedback>
            <Select
              // showSearch
              mode="tags"
              placeholder="Chọn thẻ"
              // optionFilterProp="children"
              filterOption={filterOption}
              options={tagsDatas}
            />
          </Form.Item>
        </Flex>
        <UploadPhotoInput propUpload={propUpload} />
        <ButtonAddForm loading={loading} />
      </Form>
    </Card>
  );
};

export default Create;
