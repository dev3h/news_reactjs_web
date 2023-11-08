import { Card } from "antd";
import CardPostHeader from "./CardPostHeader";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardPost = ({ post }) => {
  const imageUrl = post?.photo || "/posts/default-posts.jpg";
  return (
    <Card
      title={
        <CardPostHeader url={`/${post.slug}/detail`} author={post?.created_by_admin} />
      }
      bordered={false}
    >
      <Link to={`/${post.slug}/detail`} className="text-black" title={post?.title}>
        <h3 className=" line-clamp-3 text-justify font-medium">{post?.title}</h3>
        <div>
          <span>{post?.created_at}</span>
          <img
            src={imageUrl}
            alt=""
            className="w-full lg:h-[200px] h-[300px] object-cover rounded-md"
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
