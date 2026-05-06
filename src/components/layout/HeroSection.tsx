// import style from "../../styles/Home.module.css";
import style from "../../styles/HeroSection.module.css";

import { Select } from "antd";

export const HeroSection = () => {
  const options = [
    { value: "bride", label: "Bride" },
    { value: "groom", label: "Groom" },
  ];
  const selectYears = [
    { value: "20", label: "20 yrs" },
    { value: "21", label: "21 yrs" },
    { value: "22", label: "22 yrs" },
    { value: "23", label: "23 yrs" },
    { value: "24", label: "24 yrs" },
    { value: "25", label: "25 yrs" },
  ];

  const SelectReligion = [
    { value: "hindu", label: "Hindu" },
    { value: "muslim", label: "Muslim" },   
    { value: "christian", label: "Christian" },
    { value: "sikh", label: "Sikh" },
    { value: "jain", label: "Jain" },
    { value: "buddhist", label: "Buddhist" },
  ];
  return (
    <>
      <section className={style.hero}>
        <h2>Dream it. Believe it. Make it happen!</h2>

        <div className={style.selectContainer}>
          <Select
            className={style.select}
            options={options}
            placeholder="Looking for?"
          />

          <Select
            className={style.select}
            options={selectYears}
            placeholder="20 yrs"
          />

          <Select
            className={style.select}
            options={SelectReligion}
            placeholder="Select Religion"
          />

          <button>Search</button>
        </div>
      </section>
    </>
  );
};
