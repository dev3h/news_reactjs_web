import { Button, Form } from "antd";
import PropTypes from "prop-types";

const ButtonAddForm = ({ loading }) => {
  return (
    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        Thêm
      </Button>
    </Form.Item>
  );
};

const ButtonUpdateForm = ({ loading }) => {
  return (
    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        Cập nhập
      </Button>
    </Form.Item>
  );
};

ButtonAddForm.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
};
ButtonUpdateForm.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

export { ButtonAddForm, ButtonUpdateForm };
