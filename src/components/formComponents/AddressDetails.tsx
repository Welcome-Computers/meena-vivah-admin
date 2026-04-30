import { memo } from "react";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";
import CheckBoxField from "../InputElements/CheckBoxField";
import { Form } from "antd";

const AddressDetails = memo((props: any) => {
  const { form } = props;


  // empty entires add button validation
  // const addressdetails=Form.useWatch("address_details")
  // const firstaddress=addressdetails[0]
  // const isFirstFilled=firstaddress.full_address

  return (
    
    <div className={style["form-container"]}>
      <FormListComponent formListName="address_details" >
        {(value: any) => (
          <div>
            <TextAreaField
              name={[value.name, "full_address"]}
              label="Address"
              rows={1}
            />

            <InputField name={[value.name, "tehsil"]} label="Tehsil/Village" />

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
          </div>
        )}
      </FormListComponent>
    </div>
  );
});

AddressDetails.displayName = "AddressDetails";
export default AddressDetails;
