import { Form } from "antd";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import CheckBoxField from "../InputElements/CheckBoxField";
import InputField from "../InputElements/InputField";
import SearchableSelectField from "../InputElements/SearchableSelectField";
import FormListComponent from "./FormListComponent";

const SiblingDetails = memo((props: any) => {
  const { form, occupatonOptions, isOccupationLoading, handleCreateOccupation } = props;


  // validation for add empty entries
  const siblingdata = Form.useWatch("sibling_details", form) || [];
  const lastItem = siblingdata[siblingdata.length - 1];
  const isDisabled = !(lastItem?.sibling_name?.length > 2 && lastItem?.relation?.length > 1);


  return (
    <div
      className={style["form-container"]}
      style={{ backgroundColor: "#eeeeee" }}
    >
      <p
        style={{ margin: "10px 0 5px 0", fontSize: "14px" }}
        className={style["form-title"]}
      >
        Siblings Details
      </p>

      <FormListComponent
        form={form}
        formListName="sibling_details" isDisabled={isDisabled}>
        {(value: any) => (
          <div>
            <InputField
              name={[value.name, "sibling_name"]}
              rules={[
                { pattern: /^[a-zA-Z\s]+$/, message: "Only letters allowed" },
                { max: 30, message: "Maximum 30 characters" },
              ]}
              label="Name"
            />
            <CheckBoxField
              label="Relation"
              form={form}
              isLableShow={true}
              name={[value.name, "relation"]}
              options={[
                {
                  option: "Sister",
                  value: "sister",
                },
                {
                  option: "Brother",
                  value: "broter",
                },
              ]}
              rules={[
                {
                  // validation to check duplicate sibling entry based on name and relation

                  validator(_: any, value: any) {
                    const sibling = form.getFieldValue("sibling_details") || [];
                    const seen = new Set();

                    for (const item of sibling) {
                      const name = (item?.sibling_name || "").trim().toLowerCase();
                      const relation = (item?.relation || "").trim().toLowerCase();

                      if (!name || !relation) continue;

                      const key = `${name}-${relation}`;

                      if (seen.has(key)) {
                        return Promise.reject(new Error("Duplicate Sibling Entry"));
                      }

                      seen.add(key);
                    }

                    return Promise.resolve();
                  }
                },
              ]}
            />


            <CheckBoxField
              label="Sibling Order"
              form={form}
              isLableShow={true}
              name={[value.name, "sibling_order"]}
              options={[
                {
                  option: "Elder",
                  value: "elder",
                },
                {
                  option: "Younger",
                  value: "younger",
                },
              ]}
            />

            <CheckBoxField
              label="Marital Status"
              form={form}
              isLableShow={true}
              name={[value.name, "is_married"]}
              options={[
                {
                  option: "Married",
                  value: 1,
                },
                {
                  option: "UnMarried",
                  value: 0,
                },
              ]}
            />

            <InputField
              name={[value.name, "sibling_education"]}
              label="Education"
              rules={[{ max: 100, message: "Maximum 100 characters" }]}
            />

            <SearchableSelectField
              name={[value.name, "sibling_occupation"]}
              label="Occupation"
              options={occupatonOptions}
              loading={isOccupationLoading}
              placeholder="Select occupations"
            />


          </div>
        )}
      </FormListComponent>
    </div>
  );
});

SiblingDetails.displayName = "SiblingDetails";
export default SiblingDetails;
