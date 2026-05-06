import style from "../../styles/Home.module.css";
import { FooterComponent } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavBar } from "@/components/layout/NavBar";

const Home = () => {
  return (
    <>
      <header className={style.header}>
        {/* Navbar */}
        <NavBar isDropDownShow={false} isButtonShow={true} />
      </header>

      {/* hero section + banner image  */}
      <HeroSection />

      {/* FOOTER SECTION  */}
      <FooterComponent />
    </>
  );
};

export default Home;
