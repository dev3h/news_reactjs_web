import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, Flex, FloatButton } from "antd";
import postServices from "@/services/userServices/postServices";
import PostDetailTool from "@/components/PostDetailTool";

import { UserContext } from "@/context/UserContext";
import PostContent from "@/components/PostContent";
import { useUserStore } from "@/stores/user-store/UserStore";

const DetailPost = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [countComment, setCountComment] = useState(0);
  const [commentDatas, setCommentDatas] = useState([]);
  const { userIP, getUserIP } = useUserStore();

  const { slug } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await postServices.getOne(slug);
      if (response) {
        setData(response);
        const isUserLiked = response?.users_like?.find((item) => {
          return item.email === user?.data?.email;
        });
        setIsLiked(isUserLiked ? true : false);
        setCountLike(response?.users_like?.length);
        setCountComment(response?.comments?.length);
        if (response?.comments?.length > 0) {
          // sort comment by createdAt desc
          const comments = response?.comments.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });

          setCommentDatas(comments);
        }
      }
    };
    fetch();
  }, [slug]);
  useEffect(() => {
    const getIpToIncreaseViewOfPost = async () => {
      try {
        await postServices.increaseViewOfPost(slug, userIP);
      } catch (error) {
        console.error("Lỗi khi tăng view:", error);
      }
    };
    getIpToIncreaseViewOfPost();
  }, []);
  useEffect(() => {
    if (!userIP) {
      getUserIP();
    }
  }, [userIP]);
  const handleCountLike = (count) => {
    setCountLike(count);
  };
  const handleLiked = (isLiked) => {
    setIsLiked(isLiked);
  };
  return (
    <Flex vertical className="px-9 pt-9 w-[80%]">
      <Card className="w-full h-fit mt-9">
        <PostContent post={data} />
      </Card>
      <PostDetailTool
        slug={data?.slug}
        isLiked={isLiked}
        countLike={countLike}
        handleCountLike={handleCountLike}
        handleLiked={handleLiked}
        commentDatas={commentDatas}
        countComment={countComment}
      />
      <FloatButton.BackTop />
    </Flex>
  );
};

export default DetailPost;
