import { useEffect, useState } from "react";
import Slider from "react-slick";
import HeadingSection from "../Common/HeadingSection/HeadingSection";
import postServices from "@/services/userServices/postServices";
import customRenderDate from "@/utils/customRenderDate";
import "./ppost.css";
import { Link } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const GroupPost = () => {
  const [groupPost, setGroupPost] = useState([]);
  const defaultImageUrl = "/posts/default-posts.jpg";

  const handleImageError = (event) => {
    // Nếu xảy ra lỗi khi tải hình ảnh, thay thế bằng đường dẫn mặc định
    event.target.src = defaultImageUrl;
  };
  useEffect(() => {
    const getGroupPost = async () => {
      const response = await postServices.getGroupPost();
      const newLists = response?.map((item) => {
        const newCategories = item?.categories?.map((category) => {
          const newPost = category?.posts?.map((post) => {
            return {
              ...post,
              photo: post?.photo || defaultImageUrl,
              date: customRenderDate(post?.created_at),
            };
          });
          return {
            ...category,
            posts: newPost,
          };
        });
        return {
          ...item,
          categories: newCategories,
        };
      });
      setGroupPost(newLists);
    };
    getGroupPost();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {groupPost?.map((group) => (
        <section className="popularPost life" key={group?.id}>
          <HeadingSection title={group?.name} />
          <div className="content">
            <Slider {...settings}>
              {group?.categories?.map((category) => {
                return category?.posts?.map((post) => (
                  <Link
                    to={`/${post.slug}/detail`}
                    className="text-black"
                    title={post?.title}
                    key={post?.id}
                  >
                    <div className="items">
                      <div className="shadow box">
                        <div className="images">
                          <div className="img">
                            <img
                              src={post?.photo}
                              alt=""
                              onError={handleImageError}
                              loading="lazy"
                            />
                          </div>
                          <div className="category category1">
                            <span>{category?.name}</span>
                          </div>
                        </div>
                        <div className="text">
                          <h1 className="truncate title">{post?.title}</h1>
                          <Flex className="date" gap="small" align="center">
                            <CalendarOutlined />
                            <label>{customRenderDate(post?.created_at)}</label>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  </Link>
                ));
              })}
            </Slider>
          </div>
        </section>
      ))}
    </>
  );
};

export default GroupPost;
