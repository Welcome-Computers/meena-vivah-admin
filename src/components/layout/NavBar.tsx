import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropDown } from "../home/DropDown";
import style from "./Navbar.module.css";

export const NavBar = ({
  isDropDownShow = false,
  isButtonShow = false,
}: {
  isDropDownShow?: boolean;
  isButtonShow?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const items = [
    {
      label: "Login",
      key: "login",
    },
    {
      label: "Register Free!",
      key: "register",
    },
  ];

  return (
    <Layout style={{ background: "none" }}>
      <nav className={style.nav}>
        <div className={style.leftSection}>
          <Button
            className={style.menuButton}
            onClick={() => setOpen(true)}
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          />
          <Link
            href={"/"}>
            <img src="/images/logo.png" alt="logo" className={style.logo} />
          </Link>

        </div>
        <div>
          {/* login register buttons */}
          {isButtonShow && (
            <Space>
              <Button
                danger
                onClick={() => router.push('/login')}
                className={style.button}
              >
                Login
              </Button>
              <Button
                danger
                onClick={() => router.push('/login/admin')}
                className={style.button}
              >
                Admin
              </Button>
            </Space>
          )}
        </div>
        {/* dorpdown menus*/}
        {isDropDownShow && <DropDown />}
      </nav>
      <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
        <Menu items={items} />
      </Drawer>
    </Layout >
  );
};
