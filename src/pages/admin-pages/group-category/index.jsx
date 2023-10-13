import { useEffect, useState } from "react";
import { Card, Table } from "antd";

import groupCategoryServices from "@/services/groupCategoryServices";
import { generateBasicColumn } from "@/utils/generateColumn";
import { PaginationCustom } from "@/components";

import HeaderTableBasic from "@/components/HeaderTableBasic";
import { ColumnSort } from "@/components";

const List = () => {
  const [list, setList] = useState([]);

  const [filter, setFilter] = useState({
    search: "",
    pagination: {
      defaultCurrent: 1,
      total: 0,
    },
    sort: {
      sortBy: "id",
      sortType: "ASC",
    },
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

  const handleSort = (sortBy) => {
    setFilter({
      ...filter,
      sort: {
        ...filter.sort,
        sortBy,
        sortType: filter.sort.sortType === "ASC" ? "DESC" : "ASC",
      },
    });
  };

  const { id, createdByAdmin, updatedByAdmin, createdAt, updatedAt, action } =
    generateBasicColumn(handleSort);
  const columns = [
    id,
    {
      title: () => <ColumnSort type="id" title="Tên nhóm" handleSort={handleSort} />,
      dataIndex: "name",
      key: "name",
    },
    createdByAdmin,
    updatedByAdmin,
    createdAt,
    updatedAt,
    action,
  ];

  useEffect(() => {
    const getList = async () => {
      const response = await groupCategoryServices.getList(filter);
      setList(response?.data);
      setFilter({
        ...filter,
        pagination: {
          defaultCurrent: response?.currentPage,
          total: response?.totalItems,
        },
      });
    };
    getList();
  }, [
    filter.pagination.defaultCurrent,
    filter.search,
    filter.sort.sortBy,
    filter.sort.sortType,
  ]);
  return (
    <Card>
      <Table
        title={() => <HeaderTableBasic filter={filter} handleFilterData={setFilter} />}
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={(record) => record?.id}
      />
      <PaginationCustom
        pagination={filter.pagination}
        onPaginationChange={handlePaginationChange}
      />
    </Card>
  );
};

export default List;
