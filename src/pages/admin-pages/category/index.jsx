import { useEffect, useState } from "react";
import { Card, Table, message } from "antd";

import categoryServices from "@/services/categoryServices";
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
  const getTableData = async () => {
    const response = await categoryServices.getList(filter);
    setList(response?.data);
    setFilter({
      ...filter,
      pagination: {
        defaultCurrent: response?.currentPage,
        total: response?.totalItems,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await categoryServices.delete(id);
      getTableData();
      message.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const { id, createdByAdmin, updatedByAdmin, createdAt, updatedAt, action } =
    generateBasicColumn(handleSort, handleDelete);
  const columns = [
    id,
    {
      title: () => (
        <ColumnSort type="name" title="Tên danh mục" handleSort={handleSort} />
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: () => (
        <ColumnSort type="group_category.name" title="Nhóm" handleSort={handleSort} />
      ),
      dataIndex: "group_category",
      key: "group_category",
      render: (group_category) => group_category?.name,
    },
    createdByAdmin,
    updatedByAdmin,
    createdAt,
    updatedAt,
    action,
  ];

  useEffect(() => {
    getTableData();
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
