import {
  PieChartOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  ProjectOutlined,
  HighlightOutlined,
  TagOutlined,
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

const labelList = "Danh sách";
const labelCreate = "Thêm";
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Nhóm danh mục", "2", <ClusterOutlined />, [
    getItem(labelList, "2-1"),
    getItem(labelCreate, "2-2"),
  ]),
  getItem("Danh mục", "3", <ApartmentOutlined />, [
    getItem(labelList, "3-1"),
    getItem(labelCreate, "3-2"),
  ]),
  getItem("Thẻ", "4", <TagOutlined />, [
    getItem(labelList, "4-1"),
    getItem(labelCreate, "4-2"),
  ]),
  getItem("Bài viết", "5", <ProjectOutlined />, [
    getItem(labelList, "5-1"),
    getItem(labelCreate, "5-2"),
  ]),
  getItem("Tác giả", "6", <HighlightOutlined />, [
    getItem(labelList, "6-1"),
    getItem(labelCreate, "6-2"),
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
    path: "/admin/tag",
  },
  {
    key: "4-2",
    path: "/admin/tag/create",
  },
  {
    key: "5-1",
    path: "/admin/post",
  },
  {
    key: "5-2",
    path: "/admin/post/create",
  },
  {
    key: "6-1",
    path: "/admin/manager-author",
  },
  {
    key: "6-2",
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
