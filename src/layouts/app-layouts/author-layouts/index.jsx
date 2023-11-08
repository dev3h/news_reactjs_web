import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Layout, theme } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";
import BreadCrumbCustom from "@/components/BreadCrumbCustom";
import { AdminContext } from "@/context/AdminContext";
import adminAuthServices from "@/services/authServices/adminAuthServices";

const { Content } = Layout;

const AuthorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { admin, setAdmin } = useContext(AdminContext);

  useEffect(() => {
    const token = admin?.token;
    if (!token) {
      navigate("/auth/admin/login");
    }
    const getUserInfo = async () => {
      const response = await adminAuthServices.getUserInfo(token);
      if (response) {
        setAdmin({
          ...admin,
          data: response?.data,
        });
      }
    };
    getUserInfo();
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

export default AuthorLayout;
