import { Avatar, Flex, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import customRenderAvatar from "../../utils/customRenderAvatar";
import customRenderDate from "../../utils/customRenderDate";
import "./post-content.css";

const PostContent = ({ post }) => {
  return (
    <Flex vertical gap="large">
      <Flex
        justify="space-between"
        gap="small"
        className="relative flex-row-reverse w-full px-8 py-5 bg-slate-100"
      >
        <img src={post?.photo} alt="" className="w-[200px] h-[200px] object-cover" />
        <Flex vertical gap="small">
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
          <div>
            Danh mục:
            <Tag>{post?.category?.name}</Tag>
          </div>
          <div>
            Thẻ:
            {post?.tags_info?.map((tag) => (
              <Tag key={tag?.id}>{tag?.name}</Tag>
            ))}
          </div>
        </Flex>
      </Flex>
      <div
        className="w-full h-fit px-8 py-5 bg-slate-100 text-justify text-[16px] leading-relaxed post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
    </Flex>
  );
};

PostContent.propTypes = {
  post: PropTypes.object,
};

export default PostContent;
