import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import postServices from "@/services/userServices/postServices";

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
  useEffect(() => {
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
    filter.pagination.defaultCurrent,
    filter.search,
    filter.sort.sortBy,
    filter.sort.sortType,
  ]);
  console.log(postDatas);
  return (
    <div className="px-5">
      <h2>Kết quả tìm kiếm cho {q}: </h2>
      <Flex>
        {postDatas?.length > 0 ? (
          postDatas?.map((post) => (
            <div className="w-full h-5 shadow-sm " key={post?.id}>
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
    </div>
  );
};

export default SearchResult;
