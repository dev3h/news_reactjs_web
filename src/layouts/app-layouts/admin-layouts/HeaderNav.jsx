import { Button, Layout } from "antd";
import PropTypes from "prop-types";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
const HeaderNav = ({ collapsed, handleCollapsed, background }) => {
  return (
    <Header
      style={{
        padding: 0,
        background: background,
      }}
    >
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
    </Header>
  );
};

HeaderNav.propTypes = {
  collapsed: PropTypes.bool,
  handleCollapsed: PropTypes.func,
  background: PropTypes.string,
};

export default HeaderNav;
