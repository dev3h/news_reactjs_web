import "./side.css";
import SocialMedia from "../social/SocialMedia";
import HeadingSection from "../../Common/HeadingSection/HeadingSection";
import { useUserStore } from "@/stores/user-store/UserStore";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { groupCategories } = useUserStore();
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

      <section className="catgorys">
        <HeadingSection title="Nhóm danh mục" />
        {groupCategories?.map((val) => {
          return (
            <div className="category category1" key={val?.id}>
              <Link
                className="inline-block w-full h-full text-white transition-all hover:text-white"
                to={`/group/${val?.slug}`}
              >
                {val?.name}
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default SideBar;
