import { Form } from "antd";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import InputField from "../InputElements/InputField";
import SearchableSelectField from "../InputElements/SearchableSelectField";

const FamilyDetails = memo((props: any) => {
  const { form, handleCreateOccupation, occupatonOptions, isOccupationLoading } = props;
  const motherName = Form.useWatch("mothersname", form);
  const fatherName = Form.useWatch("fathersname", form);

  return (
    <div className={style["form-container"]}>
      <InputField
        name="fathersname"
        label="Father Name"
        rules={[
          { required: true, message: "Enter first name " },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
          { max: 30, message: "Maximum 30 characters" },
        ]}
      />

      <SearchableSelectField
        name="fathersoccupation"
        label="Father Occupation"
        disabled={!fatherName}
        allowCreate
        onCreateOption={handleCreateOccupation}
        options={occupatonOptions}
        loading={isOccupationLoading}
        placeholder="Select occupations"
        rules={[
          { max: 100, message: "Maximum 100 characters" }
        ]}
      />

      <InputField
        name="mothersname"
        label="Mother Name"
        rules={[
          { max: 100, message: "Maximum 100 characters" },
        ]}
      />
      <SearchableSelectField
        name="mothersoccupation"
        label="Mother Occupation"
        disabled={!motherName}
        allowCreate
        onCreateOption={handleCreateOccupation}
        options={occupatonOptions}
        loading={isOccupationLoading}
        placeholder="Select occupations"
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
      />
    </div>
  );
});

FamilyDetails.displayName = "FamilyDetails";
export default FamilyDetails;
