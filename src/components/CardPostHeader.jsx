import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";

const CardPostHeader = () => {
  return (
    <Flex justify="space-between">
      <Avatar icon={<UserOutlined />} />
      <Flex>
        <Button type="primary">Đọc</Button>
      </Flex>
    </Flex>
  );
};

export default CardPostHeader;
