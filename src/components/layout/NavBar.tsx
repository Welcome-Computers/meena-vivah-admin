import { Button, Drawer, Menu } from "antd";
import { DropDown } from "../ui/DropDown";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
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
    <div>
      <nav className={style.nav}>
        <div className={style.leftSection}>

          <Button
            className={style.menuButton}
            onClick={() => setOpen(true)}
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          />
          <img src="./logo.png" alt="logo" className={style.logo} />

        </div>
        <div>
          {/* login register buttons */}
          {isButtonShow && (
            <>
              <button className={style.button}>
                <a href="/home">Register Free!</a>
              </button>
              <button className={style.button}>
                <a href="/home">Login</a>
              </button>
            </>
          )}
        </div>
        

        {/* dorpdown menus*/}
        {isDropDownShow && <DropDown />}
      </nav>
      <Drawer placement="right" onClose={() => setOpen(false)} open={open}>
        <Menu items={items} />
      </Drawer>
    </div>
  );
};
