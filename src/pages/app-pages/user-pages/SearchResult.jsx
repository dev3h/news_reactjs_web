import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import postServices from "@/services/userServices/postServices";
import { PaginationCustom } from "@/components";

import customRenderDate from "@/utils/customRenderDate";
import { Card, Flex } from "antd";

const SearchResult = () => {
  const [postDatas, setPostDatas] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");
  const [filter, setFilter] = useState({
    search: q,
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
    setFilter((prevFilter) => ({
      ...prevFilter,
      search: q,
    }));
    const getPostData = async () => {
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
    };
    getPostData();
  }, [
    q,
    filter.pagination.defaultCurrent,
    filter.search,
    filter.sort.sortBy,
    filter.sort.sortType,
  ]);
  return (
    <div className="px-5">
      <h2>Kết quả tìm kiếm cho {q}: </h2>
      <>
        <Flex vertical gap="small">
          {postDatas?.length > 0 ? (
            postDatas?.map((post) => (
              <div className="shadow-sm " key={post?.id}>
                <Link to={`/${post?.slug}/detail`}>
                  <Card className="hover:bg-slate-200">
                    <Flex justify="space-between" align="center">
                      <h3>{post?.title}</h3>
                      <span>{post?.created_at}</span>
                    </Flex>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <p>Không có kết quả nào</p>
          )}
        </Flex>
        {postDatas?.length > 0 && (
          <Flex justify="center" className="mb-5">
            <PaginationCustom
              pagination={filter.pagination}
              onPaginationChange={handlePaginationChange}
            />
          </Flex>
        )}
      </>
    </div>
  );
};

export default SearchResult;
