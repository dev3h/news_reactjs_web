import Slider from "react-slick";
import PropTypes from "prop-types";
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Popular.css";
import HeadingSection from "../Common/HeadingSection/HeadingSection";
import { Link } from "react-router-dom";
import { Flex } from "antd";

const Popular = ({ data }) => {
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };
  return (
    <section className="popular">
      <HeadingSection title="Popular" />
      <div className="content">
        <Slider {...settings}>
          {data?.map((val) => {
            return (
              <Link
                to={`/${val.slug}/detail`}
                className="text-black"
                title={val?.title}
                key={val?.id}
              >
                <div className="items">
                  <div className="shadow box">
                    <div className="images row">
                      <div className="img">
                        <img src={val?.photo} alt="" loading="lazy" />
                      </div>
                      <div className="category category1">
                        <span>{val?.category?.name}</span>
                      </div>
                    </div>
                    <div className="text row">
                      <h1 className="truncate title">{val?.title}</h1>
                      <Flex className="date" gap="small" align="center">
                        <CalendarOutlined />
                        <label>{val?.created_at}</label>
                      </Flex>
                      <Flex className="comment" gap="small" align="center">
                        <EyeOutlined />
                        <label>{val?.view}</label>
                      </Flex>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

Popular.propTypes = {
  data: PropTypes.array,
};

export default Popular;
