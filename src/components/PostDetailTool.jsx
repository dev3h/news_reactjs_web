import { Badge, FloatButton } from "antd";
import { CommentOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import postServices from "@/services/userServices/postServices";
import { useState } from "react";
import DrawerComment from "./DrawerComment";

const PostDetailTool = ({
  slug,
  countLike,
  handleCountLike,
  isLiked,
  handleLiked,
  commentDatas,
  countComment,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const showDrawerComment = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleLikePost = async () => {
    const response = await postServices.toggleLike(slug);
    if (response) {
      handleLiked(!isLiked);

      if (isLiked) {
        handleCountLike(countLike - 1);
      } else {
        handleCountLike(countLike + 1);
      }
    }
  };
  return (
    <>
      <FloatButton.Group className="left-6 top-1/2 -translate-y-1/2">
        <Badge count={countLike}>
          <FloatButton
            icon={isLiked ? <HeartFilled className="text-red-400" /> : <HeartOutlined />}
            onClick={handleLikePost}
          />
        </Badge>
        <Badge count={countComment} className="mt-3">
          <FloatButton icon={<CommentOutlined />} onClick={showDrawerComment} />
        </Badge>
      </FloatButton.Group>
      <DrawerComment
        isDrawerOpen={isDrawerOpen}
        handleClose={handleDrawerClose}
        commentDatas={commentDatas}
      />
    </>
  );
};

PostDetailTool.propTypes = {
  slug: PropTypes.string,
  countLike: PropTypes.number,
  handleCountLike: PropTypes.func,
  isLiked: PropTypes.bool,
  handleLiked: PropTypes.func,
  commentDatas: PropTypes.array,
  countComment: PropTypes.number,
};

export default PostDetailTool;
