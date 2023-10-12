import { Space } from "antd";
import { format } from "date-fns";
import { ButtonDelete, ButtonEdit, ButtonShow } from "../components/ButtonCustom";
import { ColumnSort } from "../components";

const generateBasicColumn = () => {
  return {
    id: {
      title: () => <ColumnSort title="ID" />,
      dataIndex: "id",
      key: "id",
    },
    createdByAdmin: {
      title: () => <ColumnSort title="Người tạo" />,
      dataIndex: "created_by_admin",
      key: "created_by_admin",
      render: (createdBy) => createdBy.username,
    },
    updatedByAdmin: {
      title: () => <ColumnSort title="Người sửa" />,
      dataIndex: "updated_by_admin",
      key: "updated_by_admin",
      render: (updatedBy) => updatedBy.username,
    },
    createdAt: {
      title: () => <ColumnSort title="Ngày tạo" />,
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt) => format(new Date(createdAt), "dd/MM/yyyy"),
    },
    updatedAt: {
      title: () => <ColumnSort title="Ngày sửa" />,
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updatedAt) => format(new Date(updatedAt), "dd/MM/yyyy"),
    },
    action: {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ButtonShow id={record.id} />
          <ButtonEdit id={record.id} />
          <ButtonDelete />
        </Space>
      ),
    },
  };
};

export { generateBasicColumn };
