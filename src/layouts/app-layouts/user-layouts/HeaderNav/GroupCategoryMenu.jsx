import { useEffect, useState } from "react";
import { Flex } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./menu.css";
import { useUserStore } from "@/stores/user-store/UserStore";
import { Link } from "react-router-dom";

const GroupCategoryMenu = () => {
  const { groups, getAllGroups } = useUserStore();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  const handleMouseEnter = (groupId) => {
    setOpenDropdown(groupId);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <Flex className="flex-1 px-4" justify="center" gap="small">
      {groups?.map((group) => {
        const hasCategories = group?.categories && group.categories.length > 0;
        return (
          <div
            className="menu-item relative w-[200px] text-center cursor-pointer transition-all"
            key={group?.id}
            onMouseEnter={() => handleMouseEnter(group?.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              className="inline-block w-full h-full text-black transition-all hover:text-orange-400 py-2"
              to={`/group/${group?.slug}`}
            >
              <Flex justify="center" align="center" gap="small">
                <span>{group?.name}</span>
                {hasCategories && <DownOutlined className="text-xs" />}
              </Flex>
            </Link>

            {/* Dropdown menu for categories */}
            {hasCategories && openDropdown === group?.id && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">
                {group.categories.map((category) => (
                  <Link
                    key={category?.id}
                    to={`/category/${category?.slug}`}
                    className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-orange-400 transition-all"
                  >
                    {category?.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </Flex>
  );
};

export default GroupCategoryMenu;
