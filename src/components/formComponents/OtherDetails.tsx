import { memo } from "react";
import { Col } from "antd";
import TextAreaField from "../InputElements/TextAreaField";
import style from "../../pages/biodata/style.module.css"

const OtherDetails = memo((props: any) => {
  const { form } = props;

  return (
    <Col xs={24} md={12} className={style["form-container"]}>
      <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }} className={style["form-title"]}>
        Other Details
      </h2>

      <TextAreaField name="other_details" label="OtherDetails" rows={1} />
    </Col>
  );
});

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
