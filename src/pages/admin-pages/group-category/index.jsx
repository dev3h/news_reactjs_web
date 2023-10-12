import { useEffect, useState } from "react";
import groupCategoryServices from "@/services/groupCategoryServices";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await groupCategoryServices.getOne(1);
      setData(response.data);
    };
    getList();
  }, []);
  console.log(data);
  return <h1>Group Category</h1>;
};

export default List;
