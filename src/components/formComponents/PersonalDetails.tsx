import { RuleObject } from "antd/es/form";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import CheckBoxField from "../InputElements/CheckBoxField";
import DobField from "../InputElements/DobField";
import HeightField from "../InputElements/HeightField";
import InputField from "../InputElements/InputField";
import SearchableSelectField from "../InputElements/SearchableSelectField";
import TextAreaField from "../InputElements/TextAreaField";

const PersonalDetails = memo((props: any) => {
  const { form, handleCreateOccupation, occupatonOptions, isOccupationLoading, handleOnBlurMobile } = props;

  return (
    <div className={style["form-container"]}>
      <InputField
        name="mobile"
        label="Mobile"
        onBlur={(e) => handleOnBlurMobile?.(e)}
        placeholder="e.g. 9988771234"
        rules={[
          {
            validator: (_: RuleObject, val: any) => {

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

              return Promise.resolve();
            },
          },
          { required: "true", message: "Mobile number must be required" }
        ]}
      />
      <CheckBoxField
        form={form}
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Select Gender First" }]}
        options={[
          { option: "Boy", value: "boy" },
          { option: "Girl", value: "girl" },
        ]}
      />
      <InputField
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Enter first name " },
          { max: 30, message: "Maximum 30 characters" },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
        ]}
      />

      <DobField
        name="dob"
        label="Date of Birth"
      />

      <HeightField
        name="height"
        label="Height"
      />

      <SearchableSelectField
        name={"occupation"}
        label={"Occupation"}
        allowCreate
        onCreateOption={handleCreateOccupation}
        options={occupatonOptions}
        loading={isOccupationLoading}
        placeholder="Select occupations"
        rules={[
          { required: true, message: "Enter Occupation " },
        ]}
      />

      <TextAreaField
        name="education"
        label="Education"
        form={form}
        rows={4}
        maxLength={50}
        rules={[
          {
            required: true,
            message: "Education Qualification Must be Filled.",
          },

          { max: 100, message: "Maximum 100 characters" },
        ]}
      />

    </div>
  );
});

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;
