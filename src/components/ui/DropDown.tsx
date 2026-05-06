import { Dropdown } from "antd";
import style from "./DropDown.module.css";
import { DownOutlined } from "@ant-design/icons";

export const DropDown = () => {


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

  const DropdownAccount = [
    {
      label: "My Account",
      key: "my-account",
    },
    {
      label: "Logout",
      key: "logout",
    },
        
  ];


  return (
    <div className={style.dropdown}>
        <a className={style.dropdownItem} href="/profile">Home</a>
      <Dropdown menu={{ items }} >
        <span className={style.dropdownItem}>Profile <span className={style.arrow}><DownOutlined /></span></span>
      </Dropdown>
      <Dropdown menu={{ items: DropdownAccount }}>
        <span className={style.dropdownItem}>Account</span>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <span className={style.dropdownItem}>Settings</span>
      </Dropdown>
    </div>
  );
};
