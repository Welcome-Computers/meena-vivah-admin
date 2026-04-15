import { Col, Form } from "antd";
import { memo } from "react";
import InputField from "../InputElements/InputField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css"

const PreferencesMobileDetails = memo((props: any) => {

  const {form}=props;
    // validation empty entries
   const mobileDetails=Form.useWatch("mobile_details",form) || [];
   const lastItem=mobileDetails[mobileDetails.length - 1 ]
   const valueDisabled=lastItem?.mobile?.length > 9
  const isDisabled=!valueDisabled;

  return (
    <div className={style["form-container"]}>
       
      


      <FormListComponent formListName="mobile_details" isDisabled={isDisabled}>
        {(field) => <InputField name={[field.name, "mobile"]} label="Mobile" placeholder="e.g. 91+"/>}
      </FormListComponent>
    </div>
  );
});

PreferencesMobileDetails.displayName = "PreferencesMobileDetails";
export default PreferencesMobileDetails;
