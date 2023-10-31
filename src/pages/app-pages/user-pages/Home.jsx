import { useEffect, useState } from "react";
import { Col, Flex, Row, Spin } from "antd";
import { PaginationCustom } from "@/components";
import postServices from " @/services/adminServices/postServices";
import customRenderDate from "@/utils/customRenderDate";
import CardPost from "@/components/CardPost";

const Home = () => {
  const [postDatas, setPostDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    pagination: {
      defaultCurrent: 1,
      total: 0,
    },
    sort: {
      sortBy: "created_at",
      sortType: "DESC",
    },
    flimit: 10,
  });
  const handlePaginationChange = (page) => {
    setFilter({
      ...filter,
      pagination: {
        ...filter.pagination,
        defaultCurrent: page,
      },
    });
  };
  useEffect(() => {
    const getPostData = async () => {
      setLoading(true);
      const response = await postServices.getList(filter);
      const newLists = response?.data?.map((item) => {
        return {
          ...item,
          created_at: customRenderDate(item?.created_at),
        };
      });
      setPostDatas(newLists);
      setFilter({
        ...filter,
        pagination: {
          defaultCurrent: response?.currentPage,
          total: response?.totalItems,
        },
      });
      setLoading(false);
    };
    getPostData();
  }, [
    filter.pagination.defaultCurrent,
    filter.search,
    filter.sort.sortBy,
    filter.sort.sortType,
  ]);
  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex justify="center" className="mb-5">
        <PaginationCustom
          pagination={filter.pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Flex>
      <Row gutter={[16, 16]}>
        {postDatas.length > 0 &&
          postDatas?.map((item, index) => (
            <Col key={index} xl={6} sm={24} xs={24}>
              <CardPost post={item} />
            </Col>
          ))}
      </Row>
      <Flex justify="center" className="mt-5">
        <PaginationCustom
          pagination={filter.pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Flex>
    </Spin>
  );
};

export default Home;
