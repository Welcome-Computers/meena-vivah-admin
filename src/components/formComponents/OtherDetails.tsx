import { memo } from "react";
import { Col } from "antd";
import TextAreaField from "../InputElements/TextAreaField";
import style from "../../pages/biodata/style.module.css"

const OtherDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
    <p style={{   fontSize:"14px"}} className={style["form-title"]}>
        Other Info      </p>


      <TextAreaField name="other_details" label={null} rows={5} />
    </div>
  );
});

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
