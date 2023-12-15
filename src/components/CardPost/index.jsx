import { Card } from "antd";
import CardPostHeader from "./CardPostHeader";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardPost = ({ post }) => {
  const defaultImageUrl = "/posts/default-posts.jpg";
  const imageUrl = post?.photo || defaultImageUrl;
  const handleImageError = (event) => {
    // Nếu xảy ra lỗi khi tải hình ảnh, thay thế bằng đường dẫn mặc định
    event.target.src = defaultImageUrl;
  };
  return (
    <Card
      title={
        <CardPostHeader url={`/${post.slug}/detail`} author={post?.created_by_admin} />
      }
      bordered={false}
    >
      <Link to={`/${post.slug}/detail`} className="text-black" title={post?.title}>
        <h3 className="font-medium text-justify line-clamp-1">{post?.title}</h3>
        <div>
          <span>{post?.created_at}</span>
          <img
            src={imageUrl}
            alt=""
            className="w-full lg:h-[200px] h-[300px] object-cover rounded-md"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      </Link>
    </Card>
  );
};
CardPost.propTypes = {
  post: PropTypes.object,
};

export default CardPost;
