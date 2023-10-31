import { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Select,
  Radio,
  DatePicker,
  Flex,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import categoryServices from " @/services/adminServices/categoryServices";
import postServices from " @/services/adminServices/postServices";
import tagServices from " @/services/adminServices/tagServices";
import uploader from "@/utils/createUploader";

const Create = () => {
  const [form] = Form.useForm();
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [tagsDatas, setTagsDatas] = useState([]);
  const [statusPostDatas, setStatusPostDatas] = useState([]);
  const [statusPostSelected, setStatusPostSelected] = useState(0);
  const [fileList, setFileList] = useState([]);
  const ckeditorConfig = {
    extraPlugins: [uploader],
  };

  const propUpload = {
    name: "photo",
    multiple: false,
    action: "http://localhost:5000/api/v1/post/upload-photo",
    fileList: fileList,
    onChange(info) {
      // Note cần làm: khi xóa thì phải xóa cả ở trên cloudinary
      let newFileList = [...info.fileList];

      // Giới hạn chỉ cho một tệp tin
      newFileList = newFileList.slice(-1);

      setFileList(newFileList);
    },
  };
  const handleSubmit = async (values) => {
    try {
      values.content = editorContent;
      const response = await postServices.create(values);
      message.success(response?.data?.message);
      form.resetFields();
      setEditorContent("");
      setFileList([]);
      // focus on first input
      form.getFieldInstance("title").focus();
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
        >
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            config={ckeditorConfig}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Lưu hoặc xuất bản hoặc lên lịch"
          name="status"
          hasFeedback
          initialValue={statusPostSelected}
          rules={[
            {
              required: true,
            },
          ]}
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
        <Flex gap="small" wrap="wrap">
          <Form.Item
            label="Nhóm"
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
        <Form.Item
          label="Ảnh bài viết"
          name="photo"
          hasFeedback
          rules={[
            {
              // format image file access extension jpg, jpeg, png
              validator: (_, value) => {
                if (value) {
                  const extension = value?.file?.name?.split(".")?.pop()?.toLowerCase();
                  const extensionList = ["jpg", "jpeg", "png"];
                  if (extensionList.includes(extension)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "File không đúng định dạng. Định dạng hỗ trợ: jpg, jpeg, png"
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload {...propUpload} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Create;
