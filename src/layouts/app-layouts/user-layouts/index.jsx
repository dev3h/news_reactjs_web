import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";

const { Content } = Layout;
const UserLayout = () => {
  return (
    <Layout className="layout">
      <HeaderNav />
      <Content>
        <div className="min-h-screen container mx-auto py-5">
          <Outlet />
        </div>
      </Content>
      <FooterNav />
    </Layout>
  );
};

export default UserLayout;
