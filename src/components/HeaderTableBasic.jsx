import { Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ButtonAdd } from "@/components/ButtonCustom";
import PropTypes from "prop-types";

const HeaderTableBasic = ({ filter, handleFilterData }) => {
  const handleSearch = (e) => {
    handleFilterData({
      ...filter,
      search: e.target.value.trim(),
    });
  };
  return (
    <Flex justify="space-between" className="mb-5">
      <Input
        placeholder="Tìm kiếm"
        size="large"
        prefix={<SearchOutlined />}
        allowClear
        onPressEnter={handleSearch}
        className="w-[12%]"
      />
      <ButtonAdd />
    </Flex>
  );
};

HeaderTableBasic.propTypes = {
  filter: PropTypes.object.isRequired,
  handleFilterData: PropTypes.func.isRequired,
};

export default HeaderTableBasic;
