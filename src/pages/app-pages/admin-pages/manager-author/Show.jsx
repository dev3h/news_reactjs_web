import { Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await managerAuthorServices.getOne(id);
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
        <p>Tên đăng nhập: {data?.username}</p>
        <p>Email: {data?.email}</p>
      </Card>
    </Spin>
  );
};

export default Show;
