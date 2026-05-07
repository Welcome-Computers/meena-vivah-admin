// import style from "../../styles/Home.module.css";
import { AGE_OPTIONS, LOOKING_FOR_OPTIONS, RELIGION_OPTIONS } from "@/pages/api/formOptions/formOptions";
import style from "./HeroSection.module.css";

import { Select } from "antd";

export const HeroSection = () => {

  return (
    <>
      <section className={style.hero}>
        <h2>Dream it. Believe it. Make it happen!</h2>

        <div className={style.selectContainer}>
          <Select
            className={style.select}
            options={LOOKING_FOR_OPTIONS}
            placeholder="Looking for?"
          />

          <Select
            className={style.select}
            options={AGE_OPTIONS}
            placeholder="20 yrs"
          />

          <Select
            className={style.select}
            options={RELIGION_OPTIONS}
            placeholder="Select Religion"
          />

          <button>Search</button>
        </div>
      </section>
    </>
  );
};
