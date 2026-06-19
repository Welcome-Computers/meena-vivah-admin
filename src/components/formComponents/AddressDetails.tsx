import { Form } from "antd";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import CheckBoxField from "../InputElements/CheckBoxField";
import InputField from "../InputElements/InputField";
import FormListComponent from "./FormListComponent";

const AddressDetails = memo((props: any) => {
  const { form } = props;

  // if address and pincode empty then button disabled and Max 2 entries
  const addressdetails = Form.useWatch("address_details") || [];

  const isDisabled =
    addressdetails.length >= 5 ||
    !addressdetails?.[0]?.full_address ||
    !addressdetails?.[0]?.type;


  return (
    <div className={style["form-container"]}>
      <FormListComponent
        form={form}
        formListName="address_details"
        isDisabled={isDisabled}
      >
        {(value: any) => (
          <div>
            {/* for address type  */}
            <CheckBoxField
              label="AddressType"
              form={form}
              isLableShow={true}
              rules={[
                // {
                //   required: true,
                //   message: "Select address type",
                // },
                {
                  validator: (_: any, currentType: any) => {
                    const addresses =
                      form.getFieldValue("address_details") || [];

                    const duplicateCount = addresses.filter(
                      (item: any) =>
                        item?.type === currentType
                    ).length;

                    if (currentType && duplicateCount > 1) {
                      return Promise.reject(
                        new Error(
                          "Address type must be different"
                        )
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
              name={[value.name, "type"]}
              options={[
                {
                  option: "Parmanent",
                  value: "parmanent",
                },
                {
                  option: "Native",
                  value: "native",
                },
                {
                  option: "Current",
                  value: "current",
                },
              ]}
            />

            <InputField
              name={[value.name, "full_address"]}
              label="Address"
            // rules={[
            //   {
            //     required: true,
            //     message: "Enter address",
            //   },
            // ]}
            />

            {/* <InputField name={[value.name, "tehsil"]} label="Tehsil/Village" /> */}


            {/* <InputField
              name={[value.name, "city"]}
              label="City"
              placeholder="e.g. Jaipur"
            />
            <InputField
              name={[value.name, "state"]}
              label="State"
              placeholder="e.g. Rajasthan"
            />
            <InputField
              name={[value.name, "pincode"]}
              label="Pincode"
              placeholder="e.g. 332001"
              rules={
                [
                  { pattern: /^[0-9]{6}$/, message: "Pincode must be 6 digit number" }

                ]
              }
            /> */}

          </div>
        )}
      </FormListComponent>
    </div>
  );
});

AddressDetails.displayName = "AddressDetails";
export default AddressDetails;
