import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";
import { DropDown } from "../ui/DropDown";
import style from "./Navbar.module.css";

export const NavBar = ({
  isDropDownShow = false,
  isButtonShow = false,
}: {
  isDropDownShow?: boolean;
  isButtonShow?: boolean;
}) => {
  const [open, setOpen] = useState(false);

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
    <Layout>
      <nav className={style.nav}>
        <div className={style.leftSection}>

          <Button
            className={style.menuButton}
            onClick={() => setOpen(true)}
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          />
          <Link
            href={"/"}>
            <img src="./logo.png" alt="logo" className={style.logo} />
          </Link>

        </div>
        <div>
          {/* login register buttons */}
          {isButtonShow && (
            <Link
              href={"/login"}
              className={style.button}>
              Update profile ?
            </Link>
          )}
        </div>


        {/* dorpdown menus*/}
        {isDropDownShow && <DropDown />}
      </nav>
      <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
        <Menu items={items} />
      </Drawer>
    </Layout>
  );
};
