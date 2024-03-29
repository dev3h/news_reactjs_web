import { Card, Flex, FloatButton, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import postServices from "@/services/adminServices/postServices";
import PostContent from "@/components/PostContent";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await postServices.getOne(id);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <Spin spinning={loading} tip="Loading...">
      <Card>
        <Flex className="relative">
          <Card className="mx-6 h-fit top-1/2">
            <PostContent post={data} />
          </Card>
          <FloatButton.BackTop />
        </Flex>
      </Card>
    </Spin>
  );
};

export default Show;
