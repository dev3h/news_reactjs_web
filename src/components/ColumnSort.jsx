import { ColumnHeightOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import PropTypes from "prop-types";

const ColumnSort = ({ title, type, handleSort }) => {
  return (
    <Flex
      onClick={() => handleSort(type)}
      align="center"
      justify="space-between"
      className="cursor-pointer"
    >
      <span>{title}</span>
      <ColumnHeightOutlined />
    </Flex>
  );
};

ColumnSort.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default ColumnSort;
