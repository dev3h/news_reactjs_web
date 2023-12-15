import { useEffect, useState } from "react";
import postServices from "@/services/userServices/postServices";
import { Flex } from "antd";
import "./menu.css";

const GroupCategoryMenu = () => {
  const [groupCategories, setGroupCategories] = useState([]);
  useEffect(() => {
    const getGroupCategories = async () => {
      try {
        const response = await postServices.getGroupCategories();
        setGroupCategories(response);
      } catch (error) {
        console.log(error);
      }
    };
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
