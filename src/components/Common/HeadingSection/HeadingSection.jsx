import PropTypes from "prop-types";
import "./heading.css";

const HeadingSection = ({ title }) => {
  return (
    <>
      <div className="heading">
        <h6>{title}</h6>
      </div>
    </>
  );
};

HeadingSection.propTypes = {
  title: PropTypes.string.isRequired,
}; 

export default HeadingSection;
