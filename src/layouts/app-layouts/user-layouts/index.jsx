import { FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";
import FooterNav from "./FooterNav";
import HeaderNav from "./HeaderNav";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import userAuthServices from "@/services/authServices/userAuthServices";
import SideBar from "@/components/SideContent/side/Side";

const { Content } = Layout;
const UserLayout = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (user && user?.token) {
      const token = user?.token;
      const getUserInfo = async () => {
        try {
          const response = await userAuthServices.getUserInfo(token);

          if (response) {
            setUser((prevUser) => ({
              ...prevUser,
              data: response.data,
            }));
          }
        } catch (error) {
          localStorage.removeItem("user");
          setUser(null);
          // const newAccessToken = await userAuthServices.refreshToken();
          // if (newAccessToken) {
          //   localStorage.setItem(
          //     "user",
          //     JSON.stringify({
          //       token: newAccessToken.accessToken,
          //     })
          //   );
          //   setUser({
          //     ...user,
          //     token: newAccessToken.accessToken,
          //   });
          // }
        }
      };
      getUserInfo();
    }
  }, [user?.token]);
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
