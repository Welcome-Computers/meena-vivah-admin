import { memo } from "react";
import FormListComponent from "./FormListComponent";
import InputField from "../InputElements/InputField";
import { RuleObject } from "antd/es/form";
import { Form } from "antd";

export const OtheGotraDetails = memo((props: any) => {
  const { form, GOTRA_FIELDS } = props;

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
      GOTRA_FIELDS.map((field: string) => form.getFieldValue(field))
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
    <FormListComponent formListName="other_gotra" isDisabled={isDisabled}>
      {(value: any) => (
        <div style={{ display: "grid", gridTemplateColumns: "6fr 3fr" }}>
          <InputField
            formItemProps={{
              labelCol: { span: 9 },
              wrapperCol: { span: 14 },
            }}
            style={{ flex: 1 }}
            name={[value.name, "other_gotra_relation"]}
            label="Other Gotra"
            placeholder="e.g. Step Mother"
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
          />

          <InputField
            formItemProps={{
              wrapperCol: { span: 24 },
            }}
            style={{ flex: 1 }}
            name={[value.name, "other_gotra_name"]}
            placeholder="e.g. Bhardwaj, Vashistha ..."
            dependencies={[["other_gotra", value.name, "other_gotra_relation"]]}
            rules={[{ validator: otherGotraRules }]}
          />
        </div>
      )}
    </FormListComponent>
  );
});
