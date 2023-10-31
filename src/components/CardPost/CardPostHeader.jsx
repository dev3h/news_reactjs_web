import { Avatar, Button, Flex } from "antd";
import PropTypes from "prop-types";
import customRenderAvatar from "@/utils/customRenderAvatar";

const CardPostHeader = ({ author }) => {
  return (
    <Flex justify="space-between">
      <Avatar>{customRenderAvatar(author?.username)}</Avatar>
      <Flex>
        <Button type="primary">Đọc</Button>
      </Flex>
    </Flex>
  );
};
CardPostHeader.propTypes = {
  author: PropTypes.object,
};

export default CardPostHeader;
