import { useEffect } from "react";
import { Flex } from "antd";
import "./menu.css";
import { useUserStore } from "@/stores/user-store/UserStore";
import { Link } from "react-router-dom";

const GroupCategoryMenu = () => {
  const { groupCategories, getGroupCategories } = useUserStore();
  useEffect(() => {
    getGroupCategories();
  }, []);
  return (
    <Flex className="flex-1 px-4" justify="center" gap="small">
      {groupCategories?.map((val) => {
        return (
          <div
            className="menu-item w-[200px] text-center cursor-pointer  transition-all"
            key={val?.id}
          >
            <Link
              className="inline-block w-full h-full text-black transition-all hover:text-orange-400"
              to={`/group/${val?.slug}`}
            >
              {val?.name}
            </Link>
          </div>
        );
      })}
    </Flex>
  );
};

export default GroupCategoryMenu;
