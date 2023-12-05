import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const Card = ({ item }) => {
  const defaultImageUrl = "/posts/default-posts.jpg";
  const imageUrl = item?.photo || defaultImageUrl;
  const handleImageError = (event) => {
    event.target.src = defaultImageUrl;
  };
  return (
    <div className="box" key={item?.id}>
      <Link to={`/${item.slug}/detail`} className="text-black" title={item?.title}>
        <div className="img">
          <img src={imageUrl} alt="" onError={handleImageError} />
        </div>
        <div className="text">
          <span className="category">{item?.category?.name}</span>
          <Link to={`/SinglePage/${item?.id}`}>
            <h1 className="titleBg">{item?.title}</h1>
          </Link>
          <div className="author flex">
            <span>by {item?.created_by_admin?.username}</span>
            <span>{item?.created_at}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};

export default Card;
