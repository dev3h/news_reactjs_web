import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Layout, notification, theme } from "antd";
import HeaderNav from "./HeaderNav";
import SideBar from "./SideBar";
import BreadCrumbCustom from "@/components/BreadCrumbCustom";
import { AdminContext } from "@/context/AdminContext";
import AdminAuthServices from "@/services/authServices/AdminAuthServices";
import logoutAdmin from "@/utils/logoutAdmin";
import { ADMIN_ROUTES } from "@/constants/routeConstants";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { admin, setAdmin } = useContext(AdminContext);
  useEffect(() => {
    const token = admin?.token;
    if (!token) {
      navigate("/auth/admin/login");
    }
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate(ADMIN_ROUTES.DASHBOARD);
    }
    const getUserInfo = async () => {
      try {
        const response = await AdminAuthServices.getUserInfo(token);

        if (response) {
          if (response?.data?.role?.role_name !== "ADMIN") {
            notification.error({
              message: "Lỗi",
              description: "Bạn phải là admin",
            });
            await logoutAdmin(setAdmin, navigate);
          }
          setAdmin({
            ...admin,
            data: response?.data,
          });
        }
      } catch (error) {
        localStorage.removeItem("admin");
        setAdmin(null);
      }
    };
    getUserInfo();
  }, [admin?.token, location.pathname, navigate, setAdmin, admin]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen ">
      {/* Sidebar */}
      <SideBar collapsed={collapsed} />
      <Layout className="!w-full">
        {/* Header Nav */}
        <HeaderNav
          collapsed={collapsed}
          handleCollapsed={setCollapsed}
          background={colorBgContainer}
        />
        <Content className="p-6">
          <BreadCrumbCustom />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
