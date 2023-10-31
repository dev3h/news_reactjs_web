import { Badge, FloatButton } from "antd";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";

const PostDetailTool = () => {
  const handleLikePost = () => {};
  return (
    <FloatButton.Group className="left-6 top-1/2 -translate-y-1/2">
      <Badge count={5}>
        <FloatButton icon={<HeartOutlined />} onClick={handleLikePost} />
      </Badge>
      <Badge count={5}>
        <FloatButton icon={<CommentOutlined />} />
      </Badge>
    </FloatButton.Group>
  );
};

export default PostDetailTool;
