import { Card } from "antd";
import { Outlet } from "react-router-dom";

const UserAuthLayout = () => {
  return (
    <div className="px-5 lg:px-0 flex justify-center items-center min-h-screen max-w-[1000px] mx-auto">
      <Card className=" w-full ">
        <Outlet />
      </Card>
    </div>
  );
};

export default UserAuthLayout;
