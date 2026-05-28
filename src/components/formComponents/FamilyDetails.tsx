import { memo } from "react";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import style from "../../pages/biodata/style.module.css";

const FamilyDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
      <InputField
        name="father_name"
        label="Father Name"
        rules={[
          { required: true, message: "enter name first" },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
          { max: 30, message: "Maximum 30 characters" },
        ]}
      />
      <TextAreaField
        name="father_occupation"
        label="Father Occupation"
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
        rows={1}
      />
      <InputField
        name="mother_name"
        label="Mother Name"
        rules={[{ max: 30, message: "Maximum 30 characters" }]}
      />
      <TextAreaField
        name="mother_occupation"
        label="Mother Occupation"
        rows={1}
        rules={[{ max: 100, message: "Maximum 100 characters" }]}
      />
    </div>
  );
});

FamilyDetails.displayName = "FamilyDetails";
export default FamilyDetails;
