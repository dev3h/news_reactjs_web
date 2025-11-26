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
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ADMIN_ROUTES } from "@/constants/routeConstants";

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
    path: ADMIN_ROUTES.DASHBOARD,
  },
  {
    key: "2-1",
    path: ADMIN_ROUTES.GROUP_CATEGORY_LIST,
  },
  {
    key: "2-2",
    path: ADMIN_ROUTES.GROUP_CATEGORY_CREATE,
  },
  {
    key: "3-1",
    path: ADMIN_ROUTES.CATEGORY_LIST,
  },
  {
    key: "3-2",
    path: ADMIN_ROUTES.CATEGORY_CREATE,
  },
  {
    key: "4-1",
    path: ADMIN_ROUTES.TAG_LIST,
  },
  {
    key: "4-2",
    path: ADMIN_ROUTES.TAG_CREATE,
  },
  {
    key: "5-1",
    path: ADMIN_ROUTES.POST_LIST,
  },
  {
    key: "5-2",
    path: ADMIN_ROUTES.POST_CREATE,
  },
  {
    key: "6-1",
    path: ADMIN_ROUTES.MANAGER_AUTHOR_LIST,
  },
  {
    key: "6-2",
    path: ADMIN_ROUTES.MANAGER_AUTHOR_CREATE,
  },
];

const SideBar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);

  // Hàm tìm key dựa trên URL
  const getKeyFromPath = (pathname) => {
    // Xử lý trường hợp đặc biệt: /admin -> dashboard
    if (pathname === "/admin" || pathname === "/admin/") {
      return "1";
    }

    const navigation = navigations.find((nav) => nav.path === pathname);
    return navigation ? navigation.key : "";
  };

  // Hàm tìm open keys (parent menu keys) dựa trên selected key
  const getOpenKeysFromSelectedKey = (key) => {
    if (!key) return [];

    const keyParts = key.split('-');
    if (keyParts.length !== 2 || !keyParts[0] || !keyParts[1]) {
      return [];
    }
    return [keyParts[0]];
  };

  // Cập nhật selectedKey và openKeys khi location thay đổi
  useEffect(() => {
    const currentKey = getKeyFromPath(location.pathname);
    setSelectedKey(currentKey);

    // Cập nhật openKeys để expand menu chứa item được chọn
    const newOpenKeys = getOpenKeysFromSelectedKey(currentKey);
    setOpenKeys(newOpenKeys);
  }, [location.pathname]);

  // Xử lý khi user click vào menu item
  const handleSelect = (item) => {
    const navigation = navigations.find((nav) => nav.key === item.key);
    if (navigation) {
      navigate(navigation.path);
    }
  };

  // Xử lý khi user mở/đóng submenu
  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
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
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        items={items}
        onSelect={handleSelect}
        onOpenChange={handleOpenChange}
      />
    </Sider>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool,
};

export default SideBar;