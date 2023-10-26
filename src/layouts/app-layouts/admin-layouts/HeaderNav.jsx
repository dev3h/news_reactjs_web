import { Avatar, Button, Dropdown, Flex, Layout } from "antd";
import PropTypes from "prop-types";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AdminContext } from "@/context/adminContext";
import { useNavigate } from "react-router-dom";
import adminAuthServices from "@/services/authServices/adminAuthServices";

const { Header } = Layout;
const items = [
  {
    label: <span>Logout</span>,
    key: "logout",
  },
];
const HeaderNav = ({ collapsed, handleCollapsed, background }) => {
  const { admin, setAdmin } = useContext(AdminContext);
  const adminInfo = admin?.data;
  const navigate = useNavigate();

  const onClick = async ({ key }) => {
    if (key === "logout") {
      const response = await adminAuthServices.logout();
      if (response) {
        localStorage.removeItem("admin");
        setAdmin(null);
        navigate("/auth/admin/login");
      }
    }
  };

  return (
    <Header
      className="p-0"
      style={{
        background: background,
      }}
    >
      <Flex justify="space-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => handleCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="pr-5">
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar size="large">{adminInfo?.username?.charAt(0).toUpperCase()}</Avatar>
            </a>
          </Dropdown>
        </div>
      </Flex>
    </Header>
  );
};

HeaderNav.propTypes = {
  collapsed: PropTypes.bool,
  handleCollapsed: PropTypes.func,
  background: PropTypes.string,
};

export default HeaderNav;
