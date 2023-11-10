import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Form, Input, message, Select, Radio, DatePicker, Flex } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import postServices from "@/services/adminServices/postServices";
import tagServices from "@/services/adminServices/tagServices";
import uploader from "@/utils/createUploader";
import categoryServices from "@/services/adminServices/categoryServices";
import UploadPhotoInput from "@/components/Input/UploadPhotoInput";
import { ButtonUpdateForm } from "@/components/Btn/ButtonAddAndUpdateForm";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
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
    action: `${import.meta.env.VITE_BASE_URL_API}/api/v1/post/upload-photo`,
    fileList: fileList,
    async onChange(info) {
      // Note cần làm: khi xóa thì phải xóa cả ở trên cloudinary
      let newFileList = [...info.fileList];

      // Giới hạn chỉ cho một tệp tin
      newFileList = newFileList.slice(-1);
      if (info.file.status === "removed") {
        setFileList([]);
        const filename = info.file?.name;
        if (filename) {
          await postServices.deletePhoto(filename);
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
      const { id, ...rest } = values;
      setLoading(true);
      const response = await postServices.update(id, rest);
      message.success(response?.data?.message);
      setLoading(false);
      navigate("/admin/post");
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
        const response = await postServices.getOne(id);
        setData(response);
        setEditorContent(response?.content);
        setStatusPostSelected(response?.status);
        if (response?.photo)
          setFileList([
            {
              uid: "-1",
              name: response?.filename,
              // status: "done",
              url: response?.photo,
              thumbUrl: response?.photo,
            },
          ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);
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
        <Form.Item name="id" initialValue={id} hidden>
          <Input />
        </Form.Item>
        {data?.title && (
          <>
            <Form.Item
              label="Tiêu đề"
              name="title"
              initialValue={data?.title}
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
                initialValue={data?.published_at ? dayjs(data?.published_at) : null}
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
                label="Danh mục"
                name="category_id"
                initialValue={data?.category_id}
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
              <Form.Item
                initialValue={data?.tags}
                className="flex-1"
                label="Thẻ"
                name="tags"
                hasFeedback
              >
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

            <ButtonUpdateForm loading={loading} />
          </>
        )}
      </Form>
    </Card>
  );
};

export default Edit;
