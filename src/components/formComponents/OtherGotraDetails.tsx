import { Form } from "antd";
import { RuleObject } from "antd/es/form";
import { memo } from "react";
import SearchableSelectField from "../InputElements/SearchableSelectField";
import FormListComponent from "./FormListComponent";

export const OtheGotraDetails = memo((props: any) => {
  const { handleCreateGotra, gottraOptions, isGotraLoading, dependencies, handleInputValue } = props;

  const form = Form.useFormInstance();

  // validation for add empty entries and maximum 3 entries
  const otherGotra = Form.useWatch("other_gotra", form) || [];
  const lastItem = otherGotra.at(-1);
  const hasRelation = lastItem?.other_gotra_relation?.length > 1;
  const hasName = lastItem?.other_gotra_name?.length > 1;
  const isDisabled = !(hasRelation && hasName) || otherGotra.length > 2;

  // check gotra details must be unique
  const otherGotraRules = (_: any, value: string) => {
    const GotraName = value?.trim()?.toLowerCase();
    if (!GotraName) {
      return Promise.resolve();
    }
    const hasDuplicate =
      gottraOptions.map((field: string) => form.getFieldValue(field))
        .filter(Boolean)
        .map((field: string) => field.trim().toLowerCase())
        .filter((field: any) => field === GotraName).length > 0;

    if (hasDuplicate) {
      return Promise.reject(new Error("duplicate value not allowed"));
    }

    // other gotra field values not be duplicated
    const OtherGotra = form.getFieldValue("other_gotra") || [];
    const duplicateGotra = OtherGotra.filter(
      (item: any) => item?.other_gotra_name?.trim().toLowerCase() === GotraName,
    );
    if (duplicateGotra.length > 1) {
      return Promise.reject(new Error("duplicate value not allowed"));
    }
    return Promise.resolve();
  };

  return (
    <FormListComponent
      form={form}
      formListName="other_gotra" style={{ marginBottom: 16 }} isDisabled={isDisabled}>
      {(value: any) => (
        <>
          <div className="otherGotraSection"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}>
            <div className="otherGotraSection_type">
              <label>Gotra Name</label>
              <SearchableSelectField
                // className="otherGotraSection_type"
                // label={"Gotra Name"}
                name={[value.name, "other_gotra_relation"]}
                options={[
                  { label: "Step Mother", value: "step_mother" },
                  { label: "Step Grand Mother", value: "step_grand_mother" },
                ]}
                dependencies={[["other_gotra", value.name, "other_gotra_name"]]}
                rules={[
                  {
                    validator: (_: RuleObject, inputVal: any) => {
                      const gotra_name = form.getFieldValue([
                        "other_gotra",
                        value.name,
                        "other_gotra_name",
                      ]);

                      if ((inputVal && !gotra_name) || (!inputVal && gotra_name)) {
                        return Promise.reject(new Error("enter both fields"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                placeholder="Select"
              />
            </div>

            <SearchableSelectField
              // mode="tags"
              className="otherGotraSection_name"
              label={"Gotra Name"}
              allowCreate
              onCreateOption={handleCreateGotra}
              name={[value.name, "other_gotra_name"]}
              options={gottraOptions}
              loading={isGotraLoading}
              dependencies={dependencies}
              onChange={(gotraCode) => {
                handleInputValue(gotraCode, name)
              }}
              placeholder="Select occupations"
              rules={[
                { validator: otherGotraRules },
              ]}
            />
          </div>
        </>
      )}
    </FormListComponent>
  );
});
