import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Layout, notification, theme } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";
import BreadCrumbCustom from "@/components/BreadCrumbCustom";
import { AdminContext } from "@/context/AdminContext";
import adminAuthServices from "@/services/authServices/adminAuthServices";
import logoutAdmin from "@/utils/logoutAdmin";

const { Content } = Layout;

const AuthorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { admin, setAdmin } = useContext(AdminContext);
  console.log(admin);

  useEffect(() => {
    const token = admin?.token;
    if (!token) {
      navigate("/auth/admin/login");
    }
    const getUserInfo = async () => {
      const response = await adminAuthServices.getUserInfo(token);
      if (response) {
        if (response?.data?.role?.role_name !== "AUTHOR") {
          notification.error({
            message: "Lỗi",
            description: "Bạn phải là author",
          });
          await logoutAdmin(setAdmin, navigate);
        }
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
