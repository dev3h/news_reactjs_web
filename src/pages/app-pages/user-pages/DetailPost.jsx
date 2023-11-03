import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, FloatButton } from "antd";
import postServices from "@/services/userServices/postServices";
import PostContent from "@/components/PostContent";
import PostDetailTool from "@/components/PostDetailTool";

import { UserContext } from "@/context/UserContext";

const DetailPost = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [countComment, setCountComment] = useState(0);
  const [commentDatas, setCommentDatas] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await postServices.getOne(slug);
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
      } catch (error) {
        console.log(error);
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
    <div className="relative">
      <img
        src="/posts/default-posts.jpg"
        alt=""
        className="w-full h-[500px] object-cover rounded-md"
      />
      <Card className="h-fit absolute top-1/2 mx-6">
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
    </div>
  );
};

export default DetailPost;
