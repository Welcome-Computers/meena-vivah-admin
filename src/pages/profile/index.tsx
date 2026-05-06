import style from "../../styles/Profile.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { NavBar } from "@/components/layout/NavBar";
import { ProfileFilter } from "@/components/layout/ProfileFilter";
import { ProfileCard } from "@/components/layout/ProfileCard";

const ProfilePage = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        {/* Navbar Profile Page with Dropdown */}
        <NavBar isDropDownShow={true} />

        {/* banner */}
        <div className={style.profilebanner}>
          <img src="profilebanner.png" alt="" />
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
