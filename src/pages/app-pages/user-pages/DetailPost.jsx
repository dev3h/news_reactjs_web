import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, Flex, FloatButton, Spin } from "antd";
import postServices from "@/services/userServices/postServices";
import PostContent from "@/components/PostContent";
import PostDetailTool from "@/components/PostDetailTool";

import { UserContext } from "@/context/UserContext";

const DetailPost = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [countComment, setCountComment] = useState(0);
  const [commentDatas, setCommentDatas] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await postServices.getOne(slug);
      if (response) {
        setLoading(false);
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
  const handleCountLike = (count) => {
    setCountLike(count);
  };
  const handleLiked = (isLiked) => {
    setIsLiked(isLiked);
  };
  return (
    <Spin spinning={loading} tip="Loading...">
      <Flex className="relative" justify="center">
        <img
          src="/posts/default-posts.jpg"
          alt=""
          className="w-full h-[500px] object-cover rounded-md"
        />
        <Card className="absolute mx-6 h-fit top-1/2 w-[90%]">
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
    </Spin>
  );
};

export default DetailPost;
