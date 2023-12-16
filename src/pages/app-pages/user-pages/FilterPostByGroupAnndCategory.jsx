import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PaginationCustom } from "@/components";

import customRenderDate from "@/utils/customRenderDate";
import { Button, Card, Flex, Select } from "antd";
import groupServices from "@/services/userServices/groupServices";
import { useUserStore } from "@/stores/user-store/UserStore";
import { FilterOutlined } from "@ant-design/icons";

const FilterPost = () => {
  const { slug, category } = useParams();
  const [postDatas, setPostDatas] = useState([]);
  const { groupCategories } = useUserStore();

  const [groupOptions, setGroupOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filter, setFilter] = useState({
    groupSelected: slug,
    categorySelected: category,
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
    const getCategoriesByGroup = async () => {
      const response = await groupServices.getCategoriesByGroup(filter.groupSelected);
      const newCategories = response?.categories?.map((item) => {
        return {
          label: item?.name,
          value: item?.slug,
        };
      });
      setCategoryOptions(newCategories);
    };
    getCategoriesByGroup();
  }, [filter]);
  useEffect(() => {
    const newGroupCategories = groupCategories?.map((item) => {
      return {
        label: item?.name,
        value: item?.slug,
      };
    });
    setGroupOptions(newGroupCategories);
  }, [groupCategories]);
  useEffect(() => {
    handleFilterPost();
  }, []);
  const handleGroupChange = (value) => {
    setFilter({
      ...filter,
      groupSelected: value,
    });
  };
  const handleFilterPost = async () => {
    const response = await groupServices.getPostsByGroupAndCategory(filter);
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
  const handleCategoryChange = (value) => {
    setFilter({
      ...filter,
      categorySelected: value,
    });
  };
  return (
    <div className="w-full">
      <div>
        <Flex gap="small" align="end">
          <Flex vertical gap="small">
            <span>Nhóm</span>
            <Select
              defaultValue={slug}
              style={{
                width: 150,
              }}
              onChange={handleGroupChange}
              options={groupOptions}
              placeholder="Chọn nhóm"
            />
          </Flex>
          <Flex vertical gap="small">
            <span>Danh mục</span>
            <Select
              style={{
                width: 150,
              }}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="Chọn danh mục"
              allowClear
            />
          </Flex>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => handleFilterPost()}
          />
        </Flex>
      </div>
      <div className="w-full px-5 mt-9">
        <>
          <Flex vertical gap="small">
            {postDatas?.length > 0 ? (
              postDatas?.map((post) => (
                <div className="shadow-sm " key={post?.id}>
                  <Link to={`/${post?.slug}/detail`}>
                    <Card className="hover:bg-slate-200">
                      <Flex justify="space-between" align="center" gap="small">
                        <img
                          src={post?.photo}
                          loading="lazy"
                          width="50"
                          height="50"
                          className="object-cover"
                        />
                        <div className="flex-1">
                          <h3>{post?.title}</h3>
                          <span>{post?.created_at}</span>
                        </div>
                      </Flex>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có bài viết nào</p>
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
    </div>
  );
};

export default FilterPost;
