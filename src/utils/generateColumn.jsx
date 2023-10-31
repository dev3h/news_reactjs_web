import { Space } from "antd";
import { ButtonDelete, ButtonEdit, ButtonShow } from "../components/ButtonCustom";
import { ColumnSort } from "../components";
import customRenderDate from "./customRenderDate";

const generateBasicColumn = (handleSort, handleDelete) => {
  return {
    id: {
      title: () => <ColumnSort type="id" title="ID" handleSort={handleSort} />,
      dataIndex: "id",
      key: "id",
    },
    createdByAdmin: {
      title: () => (
        <ColumnSort
          type="created_by_admin.username"
          title="Người tạo"
          handleSort={handleSort}
        />
      ),
      dataIndex: "created_by_admin",
      key: "created_by_admin",
      render: (createdBy) => createdBy.username,
    },
    updatedByAdmin: {
      title: () => (
        <ColumnSort
          type="updated_by_admin.username"
          title="Người sửa"
          handleSort={handleSort}
        />
      ),
      dataIndex: "updated_by_admin",
      key: "updated_by_admin",
      render: (updatedBy) => updatedBy.username,
    },
    createdAt: {
      title: () => (
        <ColumnSort type="created_at" title="Ngày tạo" handleSort={handleSort} />
      ),
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt) => customRenderDate(createdAt),
    },
    updatedAt: {
      title: () => (
        <ColumnSort type="updated_at" title="Ngày sửa" handleSort={handleSort} />
      ),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updatedAt) => customRenderDate(updatedAt),
    },
    action: {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ButtonShow id={record.id} />
          <ButtonEdit id={record.id} />
          <ButtonDelete id={record.id} handleDelete={handleDelete} />
        </Space>
      ),
    },
  };
};

export { generateBasicColumn };
