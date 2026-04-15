import { memo } from "react";
import { Col, Row } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";
import Form from "antd/es/form/Form";

const AddressDetails = memo((props: any) => {
  const { form } = props;

    // validation empty entries
   const addressDetails=Form.useWatch("address_details",form) || [];
   const lastItem=addressDetails[addressDetails.length - 1 ]
   const valueDisabled=lastItem?.full_address?.length > 5
  const isDisabled=!valueDisabled;


  return (
    <div className={style["form-container"]}>
      <FormListComponent formListName="address_details" isDisabled={isDisabled}>
        {(value) => (
          <div>
            <TextAreaField
              name={[value.name, "full_address"]}
              label="Address"
              rows={1}
            />

           
              <InputField
                name={[value.name, "tehsil"]}
                label="Tehsil/Village"
              />

              <InputField name={[value.name, "state"]} label="State" />

              <InputField
                name={[value.name, "city"]}
                label="City"
                placeholder="e.g.jaipur"
              />
              <InputField
                name={[value.name, "pincode"]}
                label="Pincode"
                placeholder="e.g. 332001"
              />
          </div>
        )}
      </FormListComponent>
    </div>
  );
});

AddressDetails.displayName = "AddressDetails";
export default AddressDetails;
