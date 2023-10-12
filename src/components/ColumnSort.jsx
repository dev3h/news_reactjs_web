import { ColumnHeightOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import PropTypes from "prop-types";

const ColumnSort = ({ title }) => {
  return (
    <Flex align="center" justify="space-between" className="cursor-pointer">
      <span>{title}</span>
      <ColumnHeightOutlined />
    </Flex>
  );
};

ColumnSort.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ColumnSort;
