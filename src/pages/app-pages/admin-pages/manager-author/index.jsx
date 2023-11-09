import { useEffect, useState } from "react";
import { Card, Table, message } from "antd";

import managerAuthorServices from "@/services/adminServices/managerAuthorServices";
import { generateBasicColumn } from "@/components/Column/GenerateColumn";
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
    const response = await managerAuthorServices.getList(filter);
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
      const response = await managerAuthorServices.delete(id);
      getTableData();
      message.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const { id, createdAt, updatedAt, action } = generateBasicColumn(
    handleSort,
    handleDelete
  );
  const columns = [
    id,
    {
      title: () => (
        <ColumnSort type="username" title="Tên đăng nhập" handleSort={handleSort} />
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: () => (
        <ColumnSort type="display_name" title="Tên hiển thị" handleSort={handleSort} />
      ),
      dataIndex: "display_name",
      key: "display_name",
    },
    {
      title: () => <ColumnSort type="email" title="Email" handleSort={handleSort} />,
      dataIndex: "email",
      key: "email",
    },
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
