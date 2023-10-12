import { PieChartOutlined, ClusterOutlined } from "@ant-design/icons";
import { Menu, Layout } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Group Category", "2", <ClusterOutlined />, [
    getItem("List", "2-1"),
    getItem("Create", "2-2"),
  ]),
];

const navigations = [
  {
    key: "1",
    path: "/admin/dashboard",
  },
  {
    key: "2-1",
    path: "/admin/group-category",
  },
  {
    key: "2-2",
    path: "/admin/group-category/create",
  },
];
const handleSelectKeyUrl = () => {
  const url = window.location.pathname;
  const navigation = navigations.find((nav) => nav.path === url);
  if (navigation) return navigation.key;
  return "";
};
const SideBar = ({ collapsed }) => {
  const [selectedKey, setSelectedKey] = useState(handleSelectKeyUrl);
  const navigate = useNavigate();
  const handleSelect = (item) => {
    const navigation = navigations.find((nav) => nav.key === item.key);

    if (navigation) navigate(navigation.path);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="h-16 bg-gray-500" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        items={items}
        onSelect={handleSelect}
      />
    </Sider>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool,
};

export default SideBar;
