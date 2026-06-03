import { Layout } from "antd";
import style from "../../styles/Home.module.css";
import { NavBar } from "./NavBar";

const { Content } = Layout;

export default function PublicLayout({ children }: any) {


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <header className={style.header}>
        {/* Navbar */}
        <NavBar isDropDownShow={false} isButtonShow={true} />
      </header>

      {/* Content */}
      <Content style={{ margin: "16px" }}>
        <div
          style={{
            padding: 20,
            background: "#fff",
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}