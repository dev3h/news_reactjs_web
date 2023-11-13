import { Card } from "antd";
import { Outlet } from "react-router-dom";

const UserAuthLayout = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
      <div className="px-5 lg:px-0 flex justify-center items-center min-h-screen max-w-[1000px] mx-auto">
        <Card className="w-full shadow-md">
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default UserAuthLayout;
