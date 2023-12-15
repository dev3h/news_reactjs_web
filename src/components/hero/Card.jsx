import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { EyeOutlined } from "@ant-design/icons";
const Card = ({ item }) => {
  const defaultImageUrl = "/posts/default-posts.jpg";
  const imageUrl = item?.photo || defaultImageUrl;
  const handleImageError = (event) => {
    event.target.src = defaultImageUrl;
  };
  return (
    <div className="box" key={item?.id}>
      <Link
        to={`/${item.slug}/detail`}
        className="inline-block w-full h-full overflow-clip"
        title={item?.title}
      >
        <img src={imageUrl} alt="" onError={handleImageError} loading="lazy" />
        <div className="text">
          <span className="category">{item?.category?.name}</span>
          <h1 className="break-words truncate titleBg w-[90%]">{item?.title}</h1>
          <span>
            <EyeOutlined /> {item?.view}
          </span>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};

export default Card;
