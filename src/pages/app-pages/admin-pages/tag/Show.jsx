import { Card, Spin, Tag } from "antd";

import tagServices from "@/services/adminServices/tagServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await tagServices.getOne(id);
        if (response) {
          setData(response);
          if (response.categories.length > 0) {
            setCategoryList(response.categories);
          }
        }
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
        <p>id thẻ: {data?.id}</p>
        <p>Tên thẻ: {data?.name}</p>
      </Card>
    </Spin>
  );
};

export default Show;
