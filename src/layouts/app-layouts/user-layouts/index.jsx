import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import userAuthServices from "@/services/authServices/userAuthServices";

const { Content } = Layout;
const UserLayout = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const token = user?.token;
    const getUserInfo = async () => {
      const response = await userAuthServices.getUserInfo(token);

      if (response) {
        setUser({
          ...user,
          data: response?.data,
        });
      }
    };
    getUserInfo();
  }, []);
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
