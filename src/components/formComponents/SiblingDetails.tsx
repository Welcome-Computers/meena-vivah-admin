import { memo } from "react";
import { Button, Col, Form } from "antd";
import InputField from "../InputElements/InputField";
import TextAreaField from "../InputElements/TextAreaField";
import CheckBoxField from "../InputElements/CheckBoxField";

const SiblingDetails = memo((props: any) => {
  const { form } = props;

  return (
    <Col xs={24} md={12}>
      <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }}>
        Siblings Details
      </h2>

      <Form.List name="sibling">
        {(fields, { add, remove }) => (
          <div>
            {fields.map((value) => (
              <div key={value.key}>
                <InputField
                  name={[value.name, "sibling_name"]}
                  label="Sibling.Name"
                />

                <TextAreaField
                  name={[value.name, "sibling_education"]}
                  label="Sibling.Education"
                  rows={1}
                />
                <TextAreaField
                  name={[value.name, "sibling_occupation"]}
                  label="Sibling.Occupation"
                  rows={1}
                />
                <CheckBoxField
                  label="Relation"
                  form={form}
                  name={[value.name, "relation"]}
                  options={[
                    {
                      option: "Sister",
                      value: "Sister",
                    },
                    {
                      option: "Brother",
                      value: "Brother",
                    },
                  ]}
                />
{fields.length >1 && 
                <Button onClick={() => remove(value.name)}>Remove</Button>
}
              </div>
            ))}

            <Button onClick={() => add()}>Add</Button>
          </div>
        )}
      </Form.List>
    </Col>
  );
});

SiblingDetails.displayName = "SiblingDetails";
export default SiblingDetails;




// import { memo } from "react";
// import { Col, Row } from "antd";
// import InputField from "../InputElements/InputField";
// import TextAreaField from "../InputElements/TextAreaField";
// import CheckBoxField from "../InputElements/CheckBoxField";

// const SiblingDetails = memo((props: any) => {
//   const { form } = props;

//   return (
//     <Col xs={24} md={12}>
//       <h2 style={{ fontFamily: "cursive", margin: "10px 0 5px 0" }}>
//         Siblings Details
//       </h2>
//       <InputField
//         name="sibling_name"
//         label="Sibling.Name"
//         maxLength={50}
//         showCount
//       />
//       <TextAreaField name="sibling_education" label="Sibling.Education" rows={1}/>
//       <TextAreaField name="sibling_occupation" label="Sibling.Occupation"  rows={1}/>
//       <CheckBoxField
//         label="Relation"
//         form={form}
//         name="Relation"
//         options={[
//           {
//             option: "Sister",
//             value: "Sister",
//           },
//           {
//             option: "Brother",
//             value: "Brother",
//           },
//         ]}
//       />
//     </Col>
//   );
// });

// SiblingDetails.displayName = "SiblingDetails";
// export default SiblingDetails;
