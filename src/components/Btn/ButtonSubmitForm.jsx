import { Button, Form } from "antd";
import PropTypes from "prop-types";

const ButtonSubmitForm = ({ title, loading }) => {
  return (
    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        {title}
      </Button>
    </Form.Item>
  );
};

ButtonSubmitForm.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

export default ButtonSubmitForm;
