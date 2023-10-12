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
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        size="large"
        className="bg-blue-400"
      >
        Thêm
      </Button>
    </Link>
  );
};

const ButtonShow = ({ id }) => {
  return (
    <Link to={`show/${id}`}>
      <Button icon={<EyeOutlined />} type="primary" className="bg-blue-400" />
    </Link>
  );
};

const ButtonEdit = ({ id }) => {
  return (
    <Link to={`edit/${id}`}>
      <Button icon={<EditOutlined />} className="bg-slate-50" />
    </Link>
  );
};

const ButtonDelete = () => {
  const confirm = () => {
    console.log("Xóa thành công");
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

export { ButtonAdd, ButtonEdit, ButtonDelete, ButtonShow };
