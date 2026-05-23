import { memo } from "react";
import InputField from "../InputElements/InputField";
import style from "../../pages/biodata/style.module.css";
import { OtheGotraDetails } from "./OtherGotraDetails";

const GotraDetials = memo((props: any) => {
  const { label, name, showCount = false, form, rules, ...rest } = props;

  // gotra validation

  const gotraOptions = [
    "Bhardwaj",
    "Vashistha",
    "Kashyap",
    "Atri",
    "Gautam",
    "Kaushik",
    "Shandilya",
    "Parashar",
    "Agastya",
    "Jamadagni",
  ];

  const gotraValidationRules = (_: any, currentValue: any) => {
    if (!currentValue) {
      return Promise.resolve();
    }
    const allGotraValues = {
      gotra_self: form.getFieldValue("gotra_self"),
      gotra_mother: form.getFieldValue("gotra_mother"),
      gotra_grandmother: form.getFieldValue("gotra_grandmother"),
      gotra_grandmother_maternal: form.getFieldValue(
        "gotra_grandmother_maternal",
      ),
    };

    const currentInputvalue = currentValue.trim().toLowerCase();
    const value = Object.values(allGotraValues)
      .filter(Boolean)
      .map((value: any) => value.trim().toLowerCase());

    let duplicatecount = value.filter(
      (value) => value && currentInputvalue === value,
    );
    if (duplicatecount.length > 1) {
      return Promise.reject("duplicate value not allowed");
    }
    return Promise.resolve();
  };
  return (
    <div className={style["form-container"]}>
      <p
        style={{ fontSize: "14px", margin: "10px 0 5px 0" }}
        className={style["form-title"]}
      >
        Gotra
      </p>

      {/*  gotra details fields */}
      <div>
        <InputField
          name="gotra_self"
          label="Self"
          dependencies={[
            "gotra_mother",
            "gotra_grandmother",
            "gotra_grandmother_maternal",
          ]}
          rules={[
            { required: true, message: "Enter Self Gotra Name" },
            { max: 40, message: "Maximum 40 characters" },
            { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
            { validator: gotraValidationRules },
          ]}
        />

        <InputField
          name="gotra_mother"
          label="Mother"
          dependencies={[
            "gotra_self",
            "gotra_grandmother",
            "gotra_grandmother_maternal",
          ]}
          rules={[
            { required: true, message: "Enter Mother Gotra Name" },
            { max: 50, message: "Maximum 50 characters" },
            { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
            { validator: gotraValidationRules },
          ]}
        />

        <InputField
          name="gotra_grandmother"
          label="Grand Mother"
          dependencies={[
            "gotra_self",
            "gotra_mother",
            "gotra_grandmother_maternal",
          ]}
          rules={[
            { required: true, message: "Enter Grand_Mother Gotra Name" },
            { max: 50, message: "Maximum 50 characters" },
            { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
            { validator: gotraValidationRules },
          ]}
        />

        <InputField
          name="gotra_grandmother_maternal"
          label="MaternalGrandmother"
          dependencies={["gotra_self", "gotra_mother", "gotra_grandmother"]}
          rules={[
            {
              required: true,
              message: "Enter Grand_Mother_Maternal Gotra Name",
            },
            { max: 50, message: "Maximum 50 characters" },
            { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
            { validator: gotraValidationRules },
          ]}
        />
      </div>

      {/* other gotra details and  button  */}
      <OtheGotraDetails form={form} />
      {/* pereferences */}
      <InputField
        name="preferences"
        label="Preferences"
        rules={[
          { max: 100, message: "Maximum 50 characters" },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
        ]}
      />
    </div>
  );
});

GotraDetials.displayName = "GotraDetials";
export default GotraDetials;
