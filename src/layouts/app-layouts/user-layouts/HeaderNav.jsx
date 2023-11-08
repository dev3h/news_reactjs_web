import { Avatar, Button, Dropdown, Flex, Input, Layout } from "antd";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";
import customRenderAvatar from "@/utils/customRenderAvatar";
import userAuthServices from "@/services/authServices/userAuthServices";
import { SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;
const items = [
  {
    label: <span>Logout</span>,
    key: "logout",
  },
];
const HeaderNav = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  
  const userInfo = user?.data;

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
  const handleSearch = (e) => {
    // search?q=abc
    navigate(`/search?q=${e.target.value.trim()}`);
  };
  return (
    <Header className="bg-white shadow-md">
      <Flex justify="space-between" align="center" className="container h-full mx-auto">
        <Link to={""} className="flex items-center h-full font-bold text-white">
          <Flex
            justify="center"
            align="center"
            className="w-[100px] h-full bg-orange-400 "
          >
            <span className="text-xl">News</span>
          </Flex>
        </Link>

        <Flex className="flex-1" justify="end" gap="small" align="center">
          <Input
            placeholder="Tìm kiếm"
            size="large"
            prefix={<SearchOutlined />}
            allowClear
            onPressEnter={handleSearch}
            className="w-1/4"
          />
          {userInfo ? (
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
          ) : (
            <Link to="/auth/login" className="text-white">
              <Button>Đăng nhập</Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};

export default HeaderNav;
