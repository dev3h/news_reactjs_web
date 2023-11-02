import { Card } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await managerAuthorServices.getOne(id);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <Card>
      <h2>Tên đăng nhập: {data?.username}</h2>
      <h2>Email: {data?.email}</h2>
    </Card>
  );
};

export default Show;
