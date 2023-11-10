import { Card, Spin, Tag } from "antd";

import groupCategoryServices from "@/services/adminServices/groupCategoryServices";
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
        const response = await groupCategoryServices.getOne(id);
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
        <p>Tên nhóm: {data?.name}</p>
        <p>Tổng số danh mục: {categoryList?.length}</p>
        {categoryList?.length > 0 && (
          <div>
            {categoryList?.map((item) => (
              <Tag key={item?.id}>{item?.name}</Tag>
            ))}
          </div>
        )}
      </Card>
    </Spin>
  );
};

export default Show;
