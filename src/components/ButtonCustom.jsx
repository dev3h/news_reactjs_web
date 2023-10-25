import { Link } from "react-router-dom";
import { Button, Popconfirm } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const ButtonAdd = () => {
  return (
    <Link to="create">
      <Button icon={<PlusCircleOutlined />} type="primary" size="large">
        Thêm
      </Button>
    </Link>
  );
};

const ButtonShow = ({ id }) => {
  return (
    <Link to={`${id}/show`}>
      <Button icon={<EyeOutlined />} type="primary" />
    </Link>
  );
};

const ButtonEdit = ({ id }) => {
  return (
    <Link to={`${id}/edit`}>
      <Button icon={<EditOutlined />} className="bg-slate-50" />
    </Link>
  );
};

const ButtonDelete = ({ id, handleDelete }) => {
  const confirm = () => {
    handleDelete(id);
  };

  return (
    <Popconfirm
      title="Xóa"
      description="Bạn có chắc chắn muốn xóa bản ghi này?"
      onConfirm={confirm}
      okText="Đồng ý"
      cancelText="Hủy"
      okButtonProps={{ className: "bg-blue-400" }}
    >
      <Button icon={<DeleteOutlined />} type="primary" danger className="bg-red-400" />
    </Popconfirm>
  );
};

ButtonShow.propTypes = {
  id: PropTypes.number.isRequired,
};
ButtonEdit.propTypes = {
  id: PropTypes.number.isRequired,
};
ButtonDelete.propTypes = {
  id: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export { ButtonAdd, ButtonEdit, ButtonDelete, ButtonShow };
