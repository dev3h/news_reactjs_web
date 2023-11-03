import { Button, Drawer, Form } from "antd";
import PropTypes from "prop-types";
import { Input } from "antd";
import postServices from "@/services/userServices/postServices";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
const { TextArea } = Input;

const DrawerComment = ({ isDrawerOpen, handleClose, commentDatas }) => {
  const [form] = Form.useForm();
  const { slug } = useParams();
  const onClose = () => {
    handleClose();
  };
  const handleSubmit = async (values) => {
    const response = await postServices.createComment(slug, values);
    if (response) {
      form.resetFields();
    }
  };
  const validateMessages = {
    required: "${label} là bắt buộc",
  };
  return (
    <Drawer
      size="large"
      title="Bình luận"
      placement="right"
      onClose={onClose}
      open={isDrawerOpen}
    >
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name="content"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
      <CommentList commentDatas={commentDatas} />
    </Drawer>
  );
};

DrawerComment.propTypes = {
  isDrawerOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  commentDatas: PropTypes.array,
};

export default DrawerComment;
