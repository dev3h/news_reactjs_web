import { Card, Spin } from "antd";

import categoryServices from "@/services/adminServices/categoryServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await categoryServices.getOne(id);
        if (response) {
          setData(response);
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
        <p>Tên danh mục: {data?.name}</p>
        <p>Nhóm: {data?.group_category?.name}</p>
      </Card>
    </Spin>
  );
};

export default Show;
