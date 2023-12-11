import { Flex, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ButtonAdd } from "@/components/ButtonCustom";
import PropTypes from "prop-types";

const HeaderTableBasic = ({ filter, handleFilterData }) => {
  const [form] = Form.useForm();
  const handleSearch = ({ search }) => {
    handleFilterData({
      ...filter,
      // search: e.target.value.trim(),
      search,
    });
  };
  return (
    <Flex justify="space-between" className="mb-5">
      <Form
        onFinish={handleSearch}
        form={form}
        className="w-full pr-5 lg:pr-0 lg:w-1/2 xl:w-1/4"
      >
        <Form.Item name="search">
          <Input
            placeholder="Tìm kiếm"
            size="large"
            prefix={<SearchOutlined />}
            allowClear
            // onPressEnter={handleSearch}
          />
        </Form.Item>
      </Form>
      <ButtonAdd />
    </Flex>
  );
};

HeaderTableBasic.propTypes = {
  filter: PropTypes.object.isRequired,
  handleFilterData: PropTypes.func.isRequired,
};

export default HeaderTableBasic;
