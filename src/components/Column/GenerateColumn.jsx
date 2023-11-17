import { Space } from "antd";
import { ButtonDelete, ButtonEdit, ButtonShow } from "../ButtonCustom";
import customRenderDate from "@/utils/customRenderDate";

const generateBasicColumn = (
  filter,
  handleSort,
  handleDelete,
  confirmLoading,
  handleConfirm
) => {
  return {
    id: {
      title: "ID",
      // title: () => <ColumnSort type="id" title="ID" handleSort={handleSort} />,
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: filter.sort.sortBy === "id" ? filter.sort.sortType : false,
      onHeaderCell: (column) => ({
        onClick: () => {
          handleSort(column?.key);
        },
      }),
    },
    createdByAdmin: {
      title: "Người tạo",
      // title: () => (
      //   <ColumnSort
      //     type="created_by_admin.username"
      //     title="Người tạo"
      //     handleSort={handleSort}
      //   />
      // ),
      dataIndex: "created_by_admin",
      key: "created_by_admin.username",
      render: (createdBy) => createdBy?.username,
      sorter: true,
      sortOrder:
        filter.sort.sortBy === "created_by_admin.username" ? filter.sort.sortType : false,
      onHeaderCell: (column) => ({
        onClick: () => {
          handleSort(column?.key);
        },
      }),
    },
    updatedByAdmin: {
      title: "Người sửa",
      // title: () => (
      //   <ColumnSort
      //     type="updated_by_admin.username"
      //     title="Người sửa"
      //     handleSort={handleSort}
      //   />
      // ),
      dataIndex: "updated_by_admin",
      key: "updated_by_admin.username",
      render: (updatedBy) => updatedBy?.username,
      sorter: true,
      sortOrder:
        filter.sort.sortBy === "updated_by_admin.username" ? filter.sort.sortType : false,
      onHeaderCell: (column) => ({
        onClick: () => {
          handleSort(column?.key);
        },
      }),
    },
    createdAt: {
      title: "Ngày tạo",
      // title: () => (
      //   <ColumnSort type="created_at" title="Ngày tạo" handleSort={handleSort} />
      // ),
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt) => customRenderDate(createdAt),
      sorter: true,
      sortOrder: filter.sort.sortBy === "created_at" ? filter.sort.sortType : false,
      onHeaderCell: (column) => ({
        onClick: () => {
          handleSort(column?.key);
        },
      }),
    },
    updatedAt: {
      title: "Ngày sửa",
      // title: () => (
      //   <ColumnSort type="updated_at" title="Ngày sửa" handleSort={handleSort} />
      // ),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updatedAt) => customRenderDate(updatedAt),
      sorter: true,
      sortOrder: filter.sort.sortBy === "updated_at" ? filter.sort.sortType : false,
      onHeaderCell: (column) => ({
        onClick: () => {
          handleSort(column?.key);
        },
      }),
    },
    action: {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <ButtonShow id={record.id} />
          <ButtonEdit id={record.id} />
          <ButtonDelete
            id={record.id}
            handleDelete={handleDelete}
            confirmLoading={confirmLoading}
            handleConfirm={handleConfirm}
          />
        </Space>
      ),
    },
  };
};

const generateColumn = (
  title,
  dataIndex,
  key,
  filter = null,
  handleSort = null,
  customRender = false,
  sorter = false
) => {
  const columnDefinition = {
    title,
    dataIndex,
    key,
  };
  if (sorter) {
    columnDefinition.sorter = true;
  }
  if (filter) {
    columnDefinition.sortOrder =
      filter?.sort?.sortBy === key ? filter?.sort?.sortType : false;
  }
  if (handleSort) {
    columnDefinition.onHeaderCell = (column) => ({
      onClick: () => {
        handleSort(column?.key);
      },
    });
  }

  if (customRender) {
    columnDefinition.render = (item, rowData) => {
      if (key === "photo") {
        if (!rowData?.photo) return null;
        return <img src={rowData?.photo} alt={rowData?.name} width="100px" />;
      }
      return item?.name;
    };
  }

  return columnDefinition;
};

export { generateBasicColumn, generateColumn };
