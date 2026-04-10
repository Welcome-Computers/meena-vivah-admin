import { Col, Form } from "antd";
import { memo } from "react";
import InputField from "../InputElements/InputField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css"

const PreferencesMobileDetails = memo((props: any) => {
  return (
    <Col xs={24} md={12} className={style["form-container"]}>
       <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }} className={style["form-title"]}>
        Preferences Details
      </h2>
      <InputField name="preferences" label="Preferences" />

      <FormListComponent formListName="mobile_details">
        {(field) => <InputField name={[field.name, "mobile"]} label="Mobile" placeholder="e.g. 91+"/>}
      </FormListComponent>
    </Col>
  );
});

PreferencesMobileDetails.displayName = "PreferencesMobileDetails";
export default PreferencesMobileDetails;
