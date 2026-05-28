import { memo } from "react";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";
import CheckBoxField from "../InputElements/CheckBoxField";
import { Form, message } from "antd";

const AddressDetails = memo((props: any) => {
  const { form } = props;

  // if address and pincode empty then button disabled and Max 2 entries
  const addressdetails = Form.useWatch("address_details") || [];
  const isFirstFilled =
    !(addressdetails.length < 2) ||
    !(addressdetails[0]?.full_address && addressdetails[0]?.pincode);

  // address type validation
  if (addressdetails[0]?.type === addressdetails[1]?.type) {
    form.setFields([
      {
        name: ["address_details", 1, "type"],
        errors: ["type must be diffrent"],
      },
    ]);
  } else {
    form.setFields([
      {
        name: ["address_details", 1, "type"],
        errors: [],
      },
    ]);
  }

  return (
    <div className={style["form-container"]}>
      <FormListComponent
        formListName="address_details"
        isDisabled={isFirstFilled}
      >
        {(value: any) => (
          <div>


               {/* for address type  */}
            <CheckBoxField
              label="AddressType"
              form={form}
              isLableShow={true}
              name={[value.name, "type"]}
              options={[
                {
                  option: "Premanent",
                  value: "Premanent",
                },
                {
                  option: "Current",
                  value: "Current",
                },
              ]}
            />
            

            
            <TextAreaField
              name={[value.name, "full_address"]}
              label="Address"
              rows={1}
            />

            <InputField name={[value.name, "tehsil"]} label="Tehsil/Village" />


            <InputField
              name={[value.name, "city"]}
              label="City"
              placeholder="e.g.jaipur"
            />
            <InputField name={[value.name, "state"]} label="State" />
            <InputField
              name={[value.name, "pincode"]}
              label="Pincode"
              placeholder="e.g. 332001"
              rules={
                [
                  {pattern:/^[0-9]{6}$/,message:"Pincode must be 6 digit number"}

                ]
              }
            />

         
          </div>
        )}
      </FormListComponent>
    </div>
  );
});

AddressDetails.displayName = "AddressDetails";
export default AddressDetails;
