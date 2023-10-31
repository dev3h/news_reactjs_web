import { Card } from "antd";

import categoryServices from "@/services/adminServices/categoryServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await categoryServices.getOne(id);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <Card>
      <h2>Tên danh mục: {data?.name}</h2>
      <h2>Nhóm: {data?.group_category?.name}</h2>
      <h2>Tạo bởi: {data?.created_by_admin?.username}</h2>
    </Card>
  );
};

export default Show;
