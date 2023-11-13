import { Card } from "antd";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AdminAuthLayout = ({ title = "Form đăng nhập quản trị" }) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
      <div className="px-5 lg:px-0 flex justify-center items-center min-h-screen max-w-[1000px] mx-auto">
        <Card title={title} className="w-full shadow-md ">
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

AdminAuthLayout.propTypes = {
  title: PropTypes.string,
};

export default AdminAuthLayout;
