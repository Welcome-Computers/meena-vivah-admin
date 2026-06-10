import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import TextAreaField from "../InputElements/TextAreaField";

const OtherDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
      <p style={{ fontSize: "14px" }} className={style["form-title"]}>
        Other Info      </p>


      <TextAreaField name="other_details" label={null} rows={5} />
    </div>
  );
});

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
