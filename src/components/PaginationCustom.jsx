import { Pagination } from "antd";
import PropTypes from "prop-types";

const PaginationCustom = ({ pagination, onPaginationChange }) => {
  const handlePageChange = (page) => {
    onPaginationChange(page);
  };
  return (
    <Pagination
      {...pagination}
      className="justify-end flex mt-4 gap-4"
      onChange={handlePageChange}
    />
  );
};

PaginationCustom.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
};

export default PaginationCustom;
