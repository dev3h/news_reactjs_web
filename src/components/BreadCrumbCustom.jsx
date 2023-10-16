import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BreadCrumbCustom = () => {
  const location = useLocation();
  const [breadcrumb, setBreadCrumb] = useState([]);
  const [pathname, setPathName] = useState([]);

  const calculatePath = (item, index) => {
    const currentPathname = window.location.pathname;
    const pathArray = currentPathname.split("/").filter((item) => item !== "");
    const adminIndex = pathArray.indexOf("admin");

    let label = item;
    let link = "";

    if (adminIndex !== -1 && adminIndex !== pathArray.length - 1) {
      const newPath = pathArray.slice(0, index + 1).join("/");
      link = `/${newPath}`;
    } else {
      link = `${item}`;
    }

    return { label, link };
  };
  useEffect(() => {
    const currentPathname = location.pathname;
    const pathArray = currentPathname.split("/").filter((item) => item !== "");
    setPathName(pathArray);
  }, [location.pathname]);
  useEffect(() => {
    setBreadCrumb([]);
    pathname.forEach((item, index) => {
      const { label, link } = calculatePath(item, index);
      setBreadCrumb((prev) => [...prev, { label, link }]);
    });
  }, [pathname]);
  const renderBreadcrumb = () => {
    const items = [];
    breadcrumb?.map((item, index) => {
      if (index === breadcrumb.length - 1) {
        items.push({
          title: item.label,
        });
      } else {
        items.push({
          title: <a href={item.link}>{item.label}</a>,
        });
      }
    });
    return items;
  };
  return <Breadcrumb className="mb-4" items={renderBreadcrumb()} />;
};

export default BreadCrumbCustom;
