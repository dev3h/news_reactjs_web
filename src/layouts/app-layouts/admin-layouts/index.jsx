import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Layout, theme } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <SideBar collapsed={collapsed} />
      <Layout>
        {/* Header Nav */}
        <HeaderNav
          collapsed={collapsed}
          handleCollapsed={setCollapsed}
          background={colorBgContainer}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
