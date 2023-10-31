import { Avatar, Dropdown, Flex, Layout } from "antd";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";
import customRenderAvatar from "@/utils/customRenderAvatar";
import userAuthServices from "@/services/authServices/userAuthServices";

const { Header } = Layout;
const items = [
  {
    label: <span>Logout</span>,
    key: "logout",
  },
];
const HeaderNav = () => {
  const { user, setUser } = useContext(UserContext);
  const userInfo = user?.data;
  const navigate = useNavigate();

  const onClick = async ({ key }) => {
    if (key === "logout") {
      try {
        const response = await userAuthServices.logout();
        if (response) {
          localStorage.removeItem("user");
          setUser(null);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Header>
      <Flex justify="space-between" align="center" className="container mx-auto h-full">
        <Link to={""} className="flex items-center h-full text-white font-bold">
          <Flex
            justify="center"
            align="center"
            className="w-[100px] h-full bg-orange-400 "
          >
            <span className="text-xl">News</span>
          </Flex>
        </Link>

        <div>
          {userInfo && (
            <Dropdown
              menu={{
                items,
                onClick,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Avatar size="large" className="bg-orange-500">
                  {userInfo?.name
                    ? customRenderAvatar(userInfo?.name)
                    : customRenderAvatar(userInfo?.email)}
                </Avatar>
              </a>
            </Dropdown>
          )}
        </div>
      </Flex>
    </Header>
  );
};

export default HeaderNav;
