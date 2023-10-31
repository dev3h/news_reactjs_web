import { Avatar, Flex } from "antd";
import PropTypes from "prop-types";
import customRenderAvatar from "../utils/customRenderAvatar";
import customRenderDate from "../utils/customRenderDate";

const PostContent = ({ post }) => {
  return (
    <Flex vertical gap="large">
      <div className="w-full bg-slate-100 px-8 py-5">
        <h1 className="capitalize">{post?.title}</h1>
        <Flex gap="small" align="center">
          <Avatar>
            {post?.created_by_admin?.username &&
              customRenderAvatar(post?.created_by_admin?.username)}
          </Avatar>
          <span>by: {post?.created_by_admin?.username}</span>
          <span>on: {post?.created_at && customRenderDate(post?.created_at)}</span>
        </Flex>
      </div>
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
