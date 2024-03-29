import { useEffect, useState } from "react";
import { Card, Table, message } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { generateBasicColumn } from "@/components/Column/GenerateColumn";
import { PaginationCustom } from "@/components";

import HeaderTableBasic from "@/components/HeaderTableBasic";
import { generateColumn } from "@/components/Column/GenerateColumn";

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
      sortType: "ASC",
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
    const response = await managerAuthorServices.getList(filter);
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
      const response = await managerAuthorServices.delete(id);
      getTableData();
      message.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const { id, createdAt, updatedAt, action } = generateBasicColumn(
    filter,
    handleSort,
    handleDelete,
    confirmLoading,
    handleConfirm
  );
  const restColumnInfo = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      filter,
      handleSort,
      customRender: false,
      sorter: true,
    },
    {
      title: "Tên hiển thị",
      dataIndex: "display_name",
      key: "display_name",
      filter,
      handleSort,
      customRender: false,
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filter,
      handleSort,
      customRender: false,
      sorter: true,
    },
    {
      title: "Vai trò",
      dataIndex: "roleInfo",
      key: "roleInfo.name",
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
