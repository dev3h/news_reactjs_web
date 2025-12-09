import { useEffect, useState } from "react";
import { Card, Table, message } from "antd";

import categoryServices from "@/services/adminServices/categoryServices";
import { generateBasicColumn, generateColumn } from "@/components/Column/GenerateColumn";
import { PaginationCustom } from "@/components";

import HeaderTableBasic from "@/components/HeaderTableBasic";

const List = () => {
  const [list, setList] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    search: "",
    pagination: {
      defaultCurrent: 1,
      total: 0,
    },
    sort: {
      sortBy: "id",
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
    setLoading(true);
    const response = await categoryServices.getList(filter);
    setList(response?.data);
    setFilter({
      ...filter,
      pagination: {
        defaultCurrent: response?.currentPage,
        total: response?.totalItems,
      },
    });
    setLoading(false);
  };

  const handleConfirm = (loading) => {
    setConfirmLoading(loading);
  };
  const handleDelete = async (id) => {
    try {
      setConfirmLoading(true);
      const response = await categoryServices.delete(id);
      getTableData();
      message.success(response?.data?.message);
      setConfirmLoading(false);
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };

  const { id, createdByAdmin, updatedByAdmin, createdAt, updatedAt, action } =
    generateBasicColumn(filter, handleSort, handleDelete, confirmLoading, handleConfirm);
  const restColumnInfo = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      filter,
      handleSort,
      customRender: false,
      sorter: true,
    },
    {
      title: "Nhóm",
      dataIndex: "group_category",
      key: "group_category.name",
      filter,
      handleSort,
      customRender: true,
      sorter: true,
    },
  ];

  const restColumns = restColumnInfo.map((column) => {
    return generateColumn(
      column.title,
      column.dataIndex,
      column.key,
      column.filter,
      column.handleSort,
      column?.customRender,
      column?.sorter
    );
  });

  const columns = [
    id,
    ...restColumns,
    // createdByAdmin,
    // updatedByAdmin,
    // createdAt,
    // updatedAt,
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
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <PaginationCustom
        pagination={filter.pagination}
        onPaginationChange={handlePaginationChange}
      />
    </Card>
  );
};

export default List;
