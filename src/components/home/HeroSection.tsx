// import style from "../../styles/Home.module.css";
import style from "./HeroSection.module.css";

import { useRouter } from "next/router";
import { queryString } from "object-query-string";
import { ProfileFilter } from "../profile/ProfileFilter";

export const HeroSection = () => {

  const { push } = useRouter()

  const filterDataHandler = (values: any) => {
    push(`/matched_profiles?${queryString(values)}`)
  }

  return (
    <section className={style.hero}>
      <h2>Dream it. Believe it.
        <span> Make it happen!</span>
      </h2>

      <div className={style.selectContainer}>
        <ProfileFilter
          callingFrom="homePage"
          filterDataHandler={filterDataHandler}
        />
      </div>
    </section>
  );
};
