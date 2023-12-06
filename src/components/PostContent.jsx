import { Avatar, Flex } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import customRenderAvatar from "../utils/customRenderAvatar";
import customRenderDate from "../utils/customRenderDate";

const PostContent = ({ post }) => {
  return (
    <Flex vertical gap="large">
      <Flex
        vertical
        align="flex-start"
        gap="small"
        className="w-full bg-slate-100 px-8 py-5"
      >
        <h1 className="capitalize">{post?.title}</h1>
        <Flex gap="small" align="center">
          <Avatar>
            {post?.created_by_admin?.username &&
              customRenderAvatar(post?.created_by_admin?.username)}
          </Avatar>
          <span>by: {post?.created_by_admin?.username}</span>
          <span>on: {post?.created_at && customRenderDate(post?.created_at)}</span>
        </Flex>
        <Flex gap="small" align="center" className="text-lg">
          <EyeOutlined />
          <span>{post?.view}</span>
        </Flex>
      </Flex>
      <div
        className="w-full h-fit px-8 py-5 bg-slate-100 text-justify text-[16px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
    </Flex>
  );
};

PostContent.propTypes = {
  post: PropTypes.object,
};

export default PostContent;
