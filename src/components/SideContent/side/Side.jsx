import "./side.css";
import Slider from "react-slick";

import SocialMedia from "../social/SocialMedia";
import HeadingSection from "../../Common/HeadingSection/HeadingSection";

//const allCat = [...new Set(popular.map((curEle) => curEle.catgeory))]
//console.log(allCat)

const SideBar = () => {
  const catgeory = [
    "world",
    "travel",
    "sport",
    "fun",
    "health",
    "fashion",
    "business",
    "technology",
  ];
  return (
    <>
      <HeadingSection title="Stay Connected" />
      <SocialMedia />

      <HeadingSection title="Subscribe" />

      <section className="subscribe">
        <h1 className="title">Subscribe to our New Stories</h1>
        <form action="">
          <input type="email" placeholder="Email Address..." />
          <button>
            <i className="fa fa-paper-plane"></i> SUBMIT
          </button>
        </form>
      </section>

      <section className="banner">
        <img src="./images/sidebar-banner-new.jpg" alt="" />
      </section>

      <section className="catgorys">
        <HeadingSection title="Catgeorys" />
        {/*<div className='items'>{allCat}</div>*/}
        {catgeory?.map((val) => {
          return (
            <div className="category category1" key={val?.id}>
              <span>{val}</span>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default SideBar;
