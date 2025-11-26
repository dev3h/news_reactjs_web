import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Form, Input, message, Select, Radio, DatePicker, Flex, Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { AdminContext } from "@/context/AdminContext";
import postServices from "@/services/adminServices/postServices";
import tagServices from "@/services/adminServices/tagServices";
import categoryServices from "@/services/adminServices/categoryServices";
import UploadPhotoInput from "@/components/Input/UploadPhotoInput";
import { ButtonUpdateForm } from "@/components/Btn/ButtonAddAndUpdateForm";
import PostPreview from "@/components/PostPreview";
import { FormContainer, FormSection, PreviewSection } from "@/components/PostPreview/styles";
import BlockNoteEditor from "@/components/BlockNoteEditor";

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { admin } = useContext(AdminContext);
  const accessToken = admin?.token;
  const [categoryDatas, setCategoryDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [editorContent, setEditorContent] = useState("");
  const [tagsDatas, setTagsDatas] = useState([]);
  const [statusPostDatas, setStatusPostDatas] = useState([]);
  const [statusPostSelected, setStatusPostSelected] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [previewData, setPreviewData] = useState({
    title: '',
    content: '',
    category: null,
    tags: [],
    status: 0,
    thumbnail: null
  });

  const updatePreviewData = (field, value) => {
    setPreviewData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusText = (statusId) => {
    const status = statusPostDatas.find(s => s.id === statusId);
    return status?.name || 'Draft';
  };

  const getCategoryName = (categoryId) => {
    const category = categoryDatas.find(c => c.value === categoryId);
    return category?.label || '';
  };

  const getTagNames = (tagIds) => {
    if (!tagIds) return [];
    return tagIds.map(id => {
      const tag = tagsDatas.find(t => t.value === id);
      return tag?.label || id;
    });
  };

  const handleEditorChange = (html) => {
    setEditorContent(html);
    updatePreviewData('content', html);
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
      // Note: when deleting, also delete on cloudinary
      let newFileList = [...info.fileList];

      // Limit to only one file
      newFileList = newFileList.slice(-1);
      if (info.file.status === "removed") {
        setFileList([]);
        updatePreviewData('thumbnail', null);
        const filename = info.file?.name;
        if (filename) {
          await postServices.deletePhoto(filename);
        }
      } else {
        setFileList(newFileList);
        if (info.file.status === 'done' && info.file.response?.data?.url) {
          updatePreviewData('thumbnail', info.file.response.data.url);
        }
      }
    },
  };
  const handleSubmit = async (values) => {
    try {
      if (fileList.length === 0) {
        delete values.photo;
      }
      values.content = editorContent;
      if (data?.filename) {
        values.filename_old = data?.filename;
      }
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
    updatePreviewData('status', e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await postServices.getOne(id);
        setData(response);
        setEditorContent(response?.content);
        setStatusPostSelected(response?.status);

        // Initialize preview data
        setPreviewData({
          title: response?.title || '',
          content: response?.content || '',
          category: response?.category_id || null,
          tags: response?.tags || [],
          status: response?.status || 0,
          thumbnail: response?.photo || null
        });
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
    <FormContainer>
      <FormSection $previewVisible={previewVisible}>
        <Card>
          {/* Preview Toggle Button */}
          <Button
            type="primary"
            icon={previewVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => setPreviewVisible(!previewVisible)}
            style={{ marginBottom: 16 }}
          >
            {previewVisible ? 'Ẩn Preview' : 'Hiện Preview'}
          </Button>
          
          <Form
            validateMessages={validateMessages}
            className="w-full"
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
                  transform: (value) => value.trim(),
                },
                {
                  required: true,
                  whitespace: true,
                  message: "Tiêu đề là bắt buộc",
                },
                {
                  min: 5,
                  message: "Tiêu đề phải có ít nhất 5 ký tự",
                },
                {
                  max: 100,
                  message: "Tiêu đề không được vượt quá 100 kí tự",
                },
              ]}
            >
              <Input 
                autoFocus 
                placeholder="Nhập tiêu đề" 
                allowClear 
                onChange={(e) => updatePreviewData('title', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              initialValue={data?.content}
              name="content"
              rules={[
                {
                  required: true,
                  message: "Nội dung là bắt buộc"
                },
              ]}
            >
              <BlockNoteEditor
                initialContent={editorContent}
                onChange={handleEditorChange}
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
                  onChange={(value) => updatePreviewData('category', value)}
                />
              </Form.Item>
              <Form.Item
                initialValue={data?.tags}
                className="flex-1"
                label="Thẻ"
                name="tags"
                hasFeedback
                rules={[
                  {
                    validator: (_, value) => {
                      if (value?.length > 0) {
                        const validTags = value.filter((tag) => tag.trim() !== "");

                        if (validTags.length === 0) {
                          form.setFieldsValue({ tags: [] });
                          return Promise.reject();
                        }
                        if (validTags.some((tag) => /[^a-zA-Z0-9\s]/.test(tag))) {
                          // check xem thẻ có ký tự đặc biệt không, nếu có thì xóa luôn thẻ đó
                          const newTags = validTags.filter(
                            (tag) => !/[^a-zA-Z0-9\s]/.test(tag)
                          );
                          form.setFieldsValue({ tags: newTags });
                          return Promise.reject("Không được nhập ký tự đặc biệt!");
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select
                  mode="tags"
                  placeholder="Chọn thẻ"
                  filterOption={filterOption}
                  options={tagsDatas}
                  onChange={(value) => updatePreviewData('tags', value)}
                />
              </Form.Item>
            </Flex>
            <Flex vertical className="mb-5">
              <UploadPhotoInput propUpload={propUpload} />
              <Flex vertical>
                <label>Ảnh cũ của bài viết</label>
                <img
                  src={data?.photo}
                  alt=""
                  className="w-[100px] h-[100px] object-cover"
                />
              </Flex>
            </Flex>

            <ButtonUpdateForm loading={loading} />
          </>
        )}
      </Form>
        </Card>
      </FormSection>
      
      {/* Preview Section */}
      <PreviewSection $visible={previewVisible}>
        <PostPreview
          data={previewData}
          categoryDatas={categoryDatas}
          tagsDatas={tagsDatas}
          statusPostDatas={statusPostDatas}
          admin={admin}
          getCategoryName={getCategoryName}
          getTagNames={getTagNames}
          getStatusText={getStatusText}
        />
      </PreviewSection>
    </FormContainer>
  );
};

export default Edit;
