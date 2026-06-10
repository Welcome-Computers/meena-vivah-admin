import SearchableSelectField from "@/components/InputElements/SearchableSelectField";

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
  isGotraLoading: boolean;
  handleCreateGotra: any,
  gottraOptions: any
}

export const GotraField = ({
  name,
  label,
  dependencies,
  gotraValidationRules,
  handleInputValue,
  isGotraLoading,
  handleCreateGotra,
  gottraOptions
}: GotraFieldProps) => {

  return (
    <>
      <SearchableSelectField
        // mode="tags"
        allowCreate
        onCreateOption={handleCreateGotra}
        name={name}
        label={label}
        options={gottraOptions}
        loading={isGotraLoading}
        dependencies={dependencies}
        onChange={(gotraCode) => {
          handleInputValue(gotraCode, name)
        }}
        placeholder="Select occupations"
        rules={[
          { max: 50, message: "Maximum 50 characters" },

          ...(name === "mat_gm_gotra"
            ? []
            : [
              { required: true, message: "Field Required." },
              { validator: gotraValidationRules },
            ]),
        ]}
      />
    </>
  );
};
