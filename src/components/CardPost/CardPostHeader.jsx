import { Avatar, Button, Flex } from "antd";
import PropTypes from "prop-types";
import customRenderAvatar from "@/utils/customRenderAvatar";
import { Link } from "react-router-dom";

const CardPostHeader = ({ author, url }) => {
  return (
    <Flex justify="space-between">
      <Avatar>{author?.username && customRenderAvatar(author?.username)}</Avatar>
      <Flex>
        <Link to={url}>
          <Button type="primary">Đọc</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
CardPostHeader.propTypes = {
  author: PropTypes.object,
  url: PropTypes.string,
};

export default CardPostHeader;
