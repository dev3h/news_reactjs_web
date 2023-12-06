import { Flex, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ButtonAdd } from "@/components/ButtonCustom";
import PropTypes from "prop-types";

const validateInput = (_, value) => {
  // Kiểm tra xem giá trị có chứa ký tự đặc biệt hay không
  if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return Promise.reject("Không được nhập ký tự đặc biệt");
  }
  return Promise.resolve();
};
const HeaderTableBasic = ({ filter, handleFilterData }) => {
  const [form] = Form.useForm();
  const handleSearch = ({ search }) => {
    handleFilterData({
      ...filter,
      // search: e.target.value.trim(),
      search: search.trim(),
    });
  };
  return (
    <Flex justify="space-between" className="mb-5">
      <Form
        onFinish={handleSearch}
        form={form}
        className="w-full pr-5 lg:pr-0 lg:w-1/2 xl:w-1/4"
      >
        <Form.Item name="search" rules={[{ validator: validateInput }]}>
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
