import { Avatar, Flex } from "antd";
import customRenderAvatar from "@/utils/customRenderAvatar";
import customRenderDate from "@/utils/customRenderDate";
import PropTypes from "prop-types";

const CommentList = ({ commentDatas }) => {
  return (
    <Flex vertical gap="middle">
      {commentDatas?.map((commentData) => (
        <Flex
          className="shadow-md shadow-gray-400 w-full px-2 py-5"
          key={commentData?.id}
        >
          <Avatar>{customRenderAvatar(commentData?.user?.email)}</Avatar>
          <Flex vertical className="w-5 flex-1 bg-lime-50">
            <Flex justify="space-between" className="px-2" wrap="wrap">
              <span className="font-bold">{commentData?.user?.email}</span>
              <span>{customRenderDate(commentData?.created_at)}</span>
            </Flex>
            <p
              className="text-justify px-2"
              dangerouslySetInnerHTML={{ __html: commentData?.content }}
            ></p>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

CommentList.propTypes = {
  commentDatas: PropTypes.array,
};

export default CommentList;
