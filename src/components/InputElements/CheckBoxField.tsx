import { Form, Radio } from "antd";
import { memo } from "react";

const CheckBoxField = memo((props: any) => {
  const { name, label, form, options, rules, isLableShow = false } = props;

  return (
    <Form.Item style={{ padding: "0", margin: 0 }}
      name={name}
      label={isLableShow ? label : null}
      rules={rules}
    >
      <Radio.Group>
        {options.map((value: any, index: number) => (
          <Radio key={index} value={value.value}  >{value.option}  </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
});

CheckBoxField.displayName = "CheckBoxField";
export default CheckBoxField;



