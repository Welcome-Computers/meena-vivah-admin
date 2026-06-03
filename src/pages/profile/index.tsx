import style from "./Profile.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { NavBar } from "@/components/layout/NavBar";
import { ProfileFilter } from "@/components/profile/ProfileFilter";
import { ProfileCard } from "@/components/profile/ProfileCard";

const ProfilePage = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        {/* Navbar Profile Page with Dropdown */}
        <NavBar isDropDownShow={true} />

        {/* banner */}
        <div className={style.profilebanner}>
          <img src="banner2.png" alt="" />
        </div>

        {/* showing profiles */}
        <section className={style.profiles}>

          {/* form gird */}
          <div className={style.gridItem}>
            <ProfileFilter />
            <ProfileCard />
          </div>

        </section>

      </header>
    </div>
  );
};

export default ProfilePage;
