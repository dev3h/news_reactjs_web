import { Layout } from "antd";
import { useMemo } from "react";
const { Footer } = Layout;
const FooterNav = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return <Footer className="bg-slate-200 text-center">©Copyright by dev3h {currentYear} </Footer>;
};

export default FooterNav;
