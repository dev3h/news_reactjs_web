import { useEffect, useState } from "react";
import { Col, Flex, Row } from "antd";
import { PaginationCustom } from "@/components";
import postServices from "@/services/userServices/postServices";
import customRenderDate from "@/utils/customRenderDate";
import CardPost from "@/components/CardPost";

import Popular from "@/components/PopularPost/Popular";
import "./style.css";
import GroupPost from "@/components/GroupPost/GroupPost";
import HeadingSection from "@/components/Common/HeadingSection/HeadingSection";
import Hero from "@/components/hero/Hero";

const Home = () => {
  const [postDatas, setPostDatas] = useState([]);
  const [heroData, setHeroData] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    pagination: {
      defaultCurrent: 1,
      total: 0,
    },
    sort: {
      sortBy: "view",
      sortType: "DESC",
    },
    flimit: 10,
  });
  const defaultImageUrl = "/posts/default-posts.jpg";

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
      const response = await postServices.getList(filter);
      const newLists = response?.data?.map((item) => {
        return {
          ...item,
          photo: item?.photo || defaultImageUrl,
          created_at: customRenderDate(item?.created_at),
        };
      });
      setPostDatas(newLists);
      // get 4 post random from newLists
      const randomPost = newLists.sort(() => Math.random() - Math.random()).slice(0, 4);
      setHeroData(randomPost);
      setFilter({
        ...filter,
        pagination: {
          defaultCurrent: response?.currentPage,
          total: response?.totalItems,
        },
      });
    };
    getPostData();
  }, [
    filter.pagination.defaultCurrent,
    filter.search,
    filter.sort.sortBy,
    filter.sort.sortType,
  ]);
  return (
    <section className="mainContent">
      <Hero data={heroData} />
      <Popular data={postDatas} />
      <GroupPost />

      {postDatas?.length > 0 ? (
        <>
          <HeadingSection title="All Post" />
          <Row gutter={[16, 16]} className="!mx-0">
            {postDatas.map((item, index) => (
              <Col key={index} xl={8} lg={12} sm={24} xs={24}>
                <CardPost post={item} />
              </Col>
            ))}
          </Row>
          {filter?.pagination?.total > postDatas.length && (
            <Flex justify="center" className="mb-5">
              <PaginationCustom
                pagination={filter.pagination}
                onPaginationChange={handlePaginationChange}
              />
            </Flex>
          )}
        </>
      ) : (
        <h2>Không có bài viết</h2>
      )}
    </section>
  );
};

export default Home;
