import { Avatar, Button, Dropdown, Flex, Input, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";

import customRenderAvatar from "@/utils/customRenderAvatar";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import GroupCategoryMenu from "./GroupCategoryMenu";
import { useUserAuthStore } from "@/stores/user-store/UserStore";

const { Header } = Layout;
const items = [
  {
    label: <span>Mật khẩu</span>,
    key: "profile",
    url: "/profile",
  },
  {
    label: <span>Đăng xuất</span>,
    key: "logout",
    url: null,
  },
];
const HeaderNav = () => {
  const navigate = useNavigate();
  // const { user, setUser } = useContext(UserContext);
  // const userInfo = user?.data;
  const { userInfo, logout } = useUserAuthStore();
  const onClick = async ({ key }) => {
    if (key === "logout") {
      try {
        logout();
        navigate("/");
        // bug: production is not save cookie to do
        // const response = await userAuthServices.logout();
        // if (response) {
        //   localStorage.removeItem("user");
        //   setUser(null);
        //   navigate("/");
        // }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate(key);
    }
  };
  const handleSearch = (e) => {
    navigate(`/search?q=${e.target.value.trim()}`);
  };
  return (
    <>
      <Flex className="container py-2" justify="space-between" gap="small" align="center">
        <Link to={""} className="flex items-center h-full font-bold text-white">
          <Flex
            justify="center"
            align="center"
            className="w-[100px] h-full bg-orange-400 "
          >
            <span className="text-xl">News</span>
          </Flex>
        </Link>
        <Flex justify="end" className="flex-1" gap="small">
          <Input
            placeholder="Tìm kiếm"
            size="large"
            prefix={<SearchOutlined />}
            allowClear
            onPressEnter={handleSearch}
            className="w-1/4"
          />
          {userInfo ? (
            <Flex align="center" gap="small">
              <span>Xin chào {userInfo?.name}</span>
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
            </Flex>
          ) : (
            <Flex align="center" gap="small">
              <Link to="/auth/login" className="text-white">
                <Button>Đăng nhập</Button>
              </Link>
              <Link to="/auth/register" className="text-white">
                <Button>Đăng ký</Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Header className="bg-white shadow-md flex container">
        <Link to={""} className="text-xl flex items-center text-black">
          <HomeOutlined />
        </Link>
        <Flex justify="space-between" align="center" className="container h-full mx-auto">
          <GroupCategoryMenu />
        </Flex>
      </Header>
    </>
  );
};

export default HeaderNav;
