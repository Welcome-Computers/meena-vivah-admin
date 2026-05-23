import { memo } from "react";
import FormListComponent from "./FormListComponent";
import InputField from "../InputElements/InputField";
import { RuleObject } from "antd/es/form";
import { Form } from "antd";

export const OtheGotraDetails = memo((props: any) => {
  const { form } = props;

  // validation for add empty entries and maximum 3 entries
   const otherGotra=Form.useWatch("other_gotra",form) || [];
   const lastItem=otherGotra[otherGotra.length - 1 ]
   const isDisabled=!(lastItem?.other_gotra_relation?.length > 1 
    && lastItem?.other_gotra_name?.length > 1 ) || (otherGotra.length > 2)


    // check gotra details must be unique
const otherGotraRules=(_:any,value:any)=>{

  const allGotraValues = {
    gotra_self: form.getFieldValue("gotra_self"),
    gotra_mother: form.getFieldValue("gotra_mother"),
    gotra_grandmother: form.getFieldValue("gotra_grandmother"),
    gotra_grandmother_maternal: form.getFieldValue(
      "gotra_grandmother_maternal",
      ),
    };
    const GotraName=value?.trim()?.toLowerCase();

    const GotraValues=Object.values(allGotraValues).filter(Boolean).map((value:any)=>value.trim().toLowerCase())

    const duplicateCount=GotraValues.filter((value:any)=>value === GotraName)
     if (duplicateCount.length > 0) {
      return Promise.reject(new Error("duplicate value not allowed"));
    }

    // other gotra field values not be duplicated
    const OtherGotraName=form.getFieldValue("other_gotra") || [];
 
    const duplicateGotra=OtherGotraName.
    filter((item:any)=>item?.other_gotra_name?.trim().toLowerCase() === GotraName)
    if(duplicateGotra.length >1){
      return Promise.reject(new Error("duplicate value not allowed"))
    }


    return Promise.resolve();

}



  return (
    <FormListComponent formListName="other_gotra" isDisabled={isDisabled}>
      {(value: any) => (
        <div style={{ display: "flex", width: "100%" }}>
          <InputField
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
            style={{ flex: 1 }}
            name={[value.name, "other_gotra_name"]}
            placeholder="e.g. Bhardwaj, Vashistha ..."
            dependencies={[["other_gotra", value.name, "other_gotra_relation"]]}
            rules={[
             { validator:otherGotraRules}
            ]}
          />
        </div>
      )}
    </FormListComponent>
  );
});
