import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import TextAreaField from "../InputElements/TextAreaField";

const OtherDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
      <TextAreaField name="other_details" label={"Other Info"} rows={5} />
    </div>
  );
});

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
