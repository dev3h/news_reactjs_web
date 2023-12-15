import { FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import { useEffect } from "react";

import SideBar from "@/components/SideContent/side/Side";
import { useUserAuthStore } from "@/stores/user-store/UserStore";

const { Content } = Layout;
const UserLayout = () => {
  const { token, getUserInfo, userInfo } = useUserAuthStore();
  useEffect(() => {
    if (token && !userInfo) {
      getUserInfo(token);
    }
  }, [token]);
  return (
    <Layout className="layout">
      <HeaderNav />
      <Content>
        <div className="container min-h-screen py-5 mx-auto">
          <div className="container lg:px-[50px]">
            <Outlet />
            <section className="sideContent">
              <SideBar />
            </section>
          </div>
        </div>
      </Content>
      <FooterNav />
      <FloatButton.BackTop />
    </Layout>
  );
};

export default UserLayout;
