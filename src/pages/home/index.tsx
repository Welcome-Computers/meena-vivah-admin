import style from "./homepage.module.css";

import { FooterComponent } from "@/components/layout/Footer";
import { HeroSection } from "@/components/ui/HeroSection";
import { NavBar } from "@/components/layout/NavBar";
import { ProfileCard } from "@/components/profile/ProfileCard";

const HomePage = () => {
  return (
    <>
      <header className={style.header}>
        {/* Navbar */}
        <NavBar isDropDownShow={false} isButtonShow={true} />
      </header>

      {/* hero section + banner image  */}
      <HeroSection />

          {/* Profile Card */}
          <div className={style.profileCardContainer}>
            <ProfileCard />
              </div>


      {/* FOOTER SECTION  */}
      <FooterComponent />
    </>
  );
};

export default HomePage;
