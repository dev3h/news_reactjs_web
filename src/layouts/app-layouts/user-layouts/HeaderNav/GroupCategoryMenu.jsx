import { useEffect } from "react";
import { Flex } from "antd";
import "./menu.css";
import { useUserStore } from "@/stores/user-store/UserStore";

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
            className="menu-item w-[200px] text-center cursor-pointer hover:text-orange-400 transition-all"
            key={val?.id}
          >
            <span>{val?.name}</span>
          </div>
        );
      })}
    </Flex>
  );
};

export default GroupCategoryMenu;
