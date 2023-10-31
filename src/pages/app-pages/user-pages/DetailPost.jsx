import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, FloatButton } from "antd";
import postServices from "@/services/userServices/postServices";

const DetailPost = () => {
  const [data, setData] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await postServices.getOne(slug);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [slug]);
  console.log(data);
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
