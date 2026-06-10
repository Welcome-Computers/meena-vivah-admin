import { Form } from "antd";
import { RuleObject } from "antd/es/form";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import InputField from "../InputElements/InputField";
import FormListComponent from "./FormListComponent";

const MobileDetails = memo((props: any) => {
  const { form } = props;

  // validation empty entries and max 3 mobile nummbers can add
  const mobileDetails = Form.useWatch("other_mobile", form) || [];
  const isDisabled = !(
    mobileDetails[mobileDetails.length - 1]?.mobile?.length > 9 &&
    mobileDetails.length < 3
  );

  return (
    <div className={style["form-container"]}>
      <FormListComponent formListName="other_mobile" isDisabled={isDisabled}>
        {(field: any) => (
          <InputField
            name={[field.name, "other_mobile"]}
            rules={[
              {
                validator: (_: RuleObject, val: any) => {
                  const mobiledetails =
                    form.getFieldValue("other_mobile") || [];
                  if (!val) {
                    return Promise.resolve();
                  }
                  if (val.length < 10) {
                    return Promise.reject(
                      new Error("Enter 10 Digit Mobile Number"),
                    );
                  }
                  if (!/^(\+91)?[6-9]\d{9}$/.test(val)) {
                    return Promise.reject(new Error("Check Mobile Number"));
                  }
                  // duplicate value count
                  const count = mobiledetails.filter(
                    (item: any) => item?.mobile === val,
                  ).length;
                  if (count > 1) {
                    return Promise.reject(new Error("Duplicate number"));
                  }

                  return Promise.resolve();
                },
              },
              // { required: "true", message: "mobile number must be required" }
            ]}
            label="Other Mobile"
            placeholder="e.g. 000-000-0000"
          />
        )}
      </FormListComponent>
    </div>
  );
});

MobileDetails.displayName = "MobileDetails";
export default MobileDetails;
