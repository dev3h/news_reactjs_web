import PropTypes from "prop-types";
import "./hero.css";
import Card from "./Card";

const Hero = ({ data }) => {
  return (
    <>
      <section className="hero">
        <div className="container">
          {data?.map((item) => {
            return <Card key={item?.id} item={item} />;
          })}
        </div>
      </section>
    </>
  );
};

Hero.propTypes = {
  data: PropTypes.array,
};

export default Hero;
