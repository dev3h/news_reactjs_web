import {
  PieChartOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  ProjectOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
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
  getItem("Category", "3", <ApartmentOutlined />, [
    getItem("List", "3-1"),
    getItem("Create", "3-2"),
  ]),
  getItem("Post", "4", <ProjectOutlined />, [
    getItem("List", "4-1"),
    getItem("Create", "4-2"),
  ]),
  getItem("Author", "5", <HighlightOutlined />, [
    getItem("List", "5-1"),
    getItem("Create", "5-2"),
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
  {
    key: "3-1",
    path: "/admin/category",
  },
  {
    key: "3-2",
    path: "/admin/category/create",
  },
  {
    key: "4-1",
    path: "/admin/post",
  },
  {
    key: "4-2",
    path: "/admin/post/create",
  },
  {
    key: "5-1",
    path: "/admin/manager-author",
  },
  {
    key: "5-2",
    path: "/admin/manager-author/create",
  },
];
const handleSelectKeyUrl = () => {
  const url = window.location.pathname;
  const navigation = navigations.find((nav) => nav.path === url);
  if (navigation) return navigation.key;
  return "";
};
const SideBar = ({ collapsed }) => {
  const [selectedKey] = useState(handleSelectKeyUrl);
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
