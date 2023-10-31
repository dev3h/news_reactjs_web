import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, FloatButton } from "antd";
import postServices from "@/services/userServices/postServices";
import PostContent from "@/components/PostContent";
import PostDetailTool from "@/components/PostDetailTool";

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
    <div className="relative">
      <img
        src="/posts/default-posts.jpg"
        alt=""
        className="w-full h-[500px] object-cover rounded-md"
      />
      <Card className="h-fit absolute top-1/2 mx-6">
        <PostContent post={data} />
      </Card>
      <PostDetailTool />
      <FloatButton.BackTop />
    </div>
  );
};

export default DetailPost;
