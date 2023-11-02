import { Card, FloatButton } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import postServices from "@/services/adminServices/postServices";
import PostContent from "@/components/PostContent";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await postServices.getOne(id);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <Card>
      <div className="relative">
        <img
          src="/posts/default-posts.jpg"
          alt=""
          className="w-full h-[500px] object-cover rounded-md"
        />
        <Card className="absolute mx-6 h-fit top-1/2">
          <PostContent post={data} />
        </Card>
        <FloatButton.BackTop />
      </div>
    </Card>
  );
};

export default Show;
