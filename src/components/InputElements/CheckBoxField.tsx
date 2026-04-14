import {  Form, Grid, Radio } from "antd";
import { memo } from "react";

const CheckBoxField = memo((props: any) => {
  const { name, label,form ,options ,rules} = props;
const {useBreakpoint}=Grid;
const screens=useBreakpoint();

  return (
        <Form.Item style={{padding:"0" ,margin:0 }}
        name={name} 
        label={screens.xs ?null:label}
        rules={rules}
        >
        <Radio.Group>
           {options.map((value:any,index)=>(
            <Radio key={index} value={value}>{value.option}</Radio>
           ))}
        </Radio.Group>
        </Form.Item>
  );
});

CheckBoxField.displayName = "CheckBoxField";
export default CheckBoxField;







// import { Checkbox, Form } from "antd";
// import { memo } from "react";

// const GenderCheckBox = memo((props: any) => {
//   const { name, label, rootClassName ,form } = props;


//   const handleBrideCheckBox = (e: any) => {
//     form.setFieldsValue({
//       Bride: e.target.checked,
//       Groom: false,
//     });
//   };

//   const handleGroomCheckBox = (e: any) => {
//     form.setFieldsValue({
//       Groom: e.target.checked,
//       Bride: false,
//     });
//   };

//   return (
//       <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//         <Form.Item
//           name="Bride"
//           label="Bride"
//           valuePropName="checked"
//           style={{ marginBottom: "0" }}
//         >
//           <Checkbox onChange={handleBrideCheckBox} />
//         </Form.Item>

//         <Form.Item
//           name="Groom"
//           label="Groom"
//           valuePropName="checked"
//           style={{ marginBottom: "0" }}
//         >
//           <Checkbox onChange={handleGroomCheckBox} />
//         </Form.Item>
//       </div>
//   );
// });

// GenderCheckBox.displayName = "GenderCheckBox";
// export default GenderCheckBox;
