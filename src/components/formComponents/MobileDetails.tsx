import { Col, Form } from "antd";
import { memo } from "react";
import InputField from "../InputElements/InputField";
import FormListComponent from "./FormListComponent";
import style from "../../pages/biodata/style.module.css";
import { RuleObject } from "antd/es/form";

const MobileDetails = memo((props: any) => {
  const { form } = props;

  // validation empty entries and max 3 mobile nummbers can add
  const mobileDetails = Form.useWatch("mobile_details", form) || [];
  const isDisabled = !(
    mobileDetails[mobileDetails.length - 1]?.mobile?.length > 9 &&
    mobileDetails.length < 3
  );

  return (
    <div className={style["form-container"]}>
      <FormListComponent formListName="mobile_details" isDisabled={isDisabled}>
        {(field: any) => (
          <InputField
            name={[field.name, "mobile"]}
            rules={[
              {
                validator: (_: RuleObject, val: any) => {
                  const mobiledetails =
                    form.getFieldValue("mobile_details") || [];
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
            ]}
            label="Mobile"
            placeholder="e.g. 91+"
          />
        )}
      </FormListComponent>
    </div>
  );
});

MobileDetails.displayName = "MobileDetails";
export default MobileDetails;
