import {
  CommentOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, FloatButton } from "antd";
import { useParams } from "react-router-dom";

const DetailPost = () => {
  const { slug } = useParams();

  return (
    <>
      <Card className="h-fit">
        <h2>Detail post</h2>
        {[...Array(100)].map((item, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptates.
          </p>
        ))}
        <FloatButton.Group
          className="left-6 top-1/2 -translate-y-1/2"
          icon={<CustomerServiceOutlined />}
        >
          <FloatButton icon={<HeartOutlined />} />
          <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
      </Card>
      <FloatButton.BackTop />
    </>
  );
};

export default DetailPost;
