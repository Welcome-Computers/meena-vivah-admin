import { AGE_OPTIONS, LOOKING_FOR_OPTIONS, RELIGION_OPTIONS } from "@/pages/api/formOptions/formOptions";
import { BellOutlined, ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useRouter } from "next/router";
import style from "./ProfileFilter.module.css";

export const ProfileFilter = () => {

  const { push } = useRouter()

  return (
    <div className={style.profileFilterContainer}>
      <label>
        <span>
          <SearchOutlined />
        </span>
        I'm looking for
      </label>
      <Select
        className={style.select}
        options={LOOKING_FOR_OPTIONS}
        placeholder="Looking for?"
      />
      <label>
        <span>
          <ClockCircleOutlined />
        </span>
        Age
      </label>
      <Select
        className={style.select}
        options={AGE_OPTIONS}
        placeholder="20 yrs"
      />
      <label>
        <span>
          <BellOutlined />
        </span>
        Select Religion
      </label>
      <Select
        className={style.select}
        options={RELIGION_OPTIONS}
        placeholder="Select Religion"
      />
      <Button
        type="primary"
        onClick={() => push(`/profile`)}
        className={style.searchButton}>
        Search
      </Button>
    </div>
  )
}