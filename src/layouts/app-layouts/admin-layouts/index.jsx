import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Layout, theme } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";
import BreadCrumbCustom from "@/components/BreadCrumbCustom";
import { AdminContext } from "@/context/AdminContext";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const info = useContext(AdminContext);

  useEffect(() => {
    const token = info?.admin?.token;
    if (!token) {
      navigate("/auth/admin/login");
    }
  }, []);
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
          }}
        >
          <BreadCrumbCustom />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
