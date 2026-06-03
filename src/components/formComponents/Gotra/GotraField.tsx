import InputField from "@/components/InputElements/InputField";
import { GotraDropDown } from "./GotraDropDown";

interface GotraFieldProps {
  name: string;
  label: string;
  dependencies: string[];
  gotraValidationRules: any;
  activatedField: string;
  suggestGotra: string[];
  handleSelectedItem: any;
  setSuggestGotra: any;
  handleInputValue: (value: string, fieldName: string) => void;
  setActivatedField: any;
  required?: boolean;
}

export const GotraField = ({
  name,
  label,
  dependencies,
  gotraValidationRules,
  activatedField,
  suggestGotra,
  handleSelectedItem,
  setSuggestGotra,
  handleInputValue,
  setActivatedField,
  required,
}: GotraFieldProps) => {
  return (
    <>
      <InputField
        name={name}
        onChange={(e) => handleInputValue(e.target.value, name)}
        label={label}
        dependencies={dependencies}
        onFocus={() => {
          setActivatedField(name);
          setSuggestGotra([]);
        }}
        rules={[
          {
            required: required,
            message: "Field Required.",
            //   message: `Enter ${name} Gotra Name`,
          },
          { max: 50, message: "Maximum 50 characters" },
          { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
          { validator: gotraValidationRules },
        ]}
      />

      {activatedField === name && (
        <GotraDropDown
          suggestGotra={suggestGotra}
          handleSelectedItem={handleSelectedItem}
          setSuggestGotra={setSuggestGotra}
        />
      )}
    </>
  );
};
