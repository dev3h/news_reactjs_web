import { useEffect } from "react";
import "./side.css";
import SocialMedia from "../social/SocialMedia";
import HeadingSection from "../../Common/HeadingSection/HeadingSection";
import { useUserStore } from "@/stores/user-store/UserStore";

const SideBar = () => {
  const { groupCategories, getGroupCategories } = useUserStore();
  useEffect(() => {
    getGroupCategories();
  }, []);
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
              <span>{val?.name}</span>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default SideBar;
