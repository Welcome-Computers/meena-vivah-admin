import { Layout } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
import style from "../../styles/Home.module.css";
import CopyrightSection from "../home/CopyrightSection";
import { NavBar } from "./NavBar";

const { Content } = Layout;

export default function PublicLayout({ children, headerSection }: any) {
  const headerRef = useRef<HTMLElement | null>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const updateSizes = () => {
      const fullHeight = window.innerHeight;
      const hHeight = headerRef.current?.offsetHeight || 0;

      setHeaderHeight(hHeight);
      setContentHeight(fullHeight - hHeight);
    };

    updateSizes();

    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <header ref={headerRef} className={style.header}>
        <NavBar isDropDownShow={false} isButtonShow={true} />
        {headerSection}
      </header>

      <Content
        style={{
          height: contentHeight,
          marginTop: headerHeight,
          overflow: "auto",
        }}
      >
        {children}
      </Content>
      <CopyrightSection />
    </Layout>
  );
}