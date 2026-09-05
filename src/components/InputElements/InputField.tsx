import { Form, FormItemProps, Input } from "antd";
import { InputProps } from "antd/es/input";
import { ReactNode, memo } from "react";

interface IProps extends Omit<InputProps, "name"> {
  name: string | string[];
  label?: string | ReactNode;
  rootClassName?: string;
  rules?: Array<any>;
  dependencies?: any[];
  formItemProps?: FormItemProps;
}

const InputField = memo((props: IProps) => {
  const {
    label,
    name,
    rootClassName,
    maxLength,
    showCount = false,
    rules,
    formItemProps,
    dependencies,
    ...rest
  } = props;

  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      rules={rules}
      label={label}
      style={{ marginBottom: "6px" }}
      {...formItemProps}
    >
      <Input
        {...rest}
        maxLength={maxLength}
        showCount={showCount}
        className={`custom-input ${rootClassName ?? ""}`}
      />
    </Form.Item>
  );
});

InputField.displayName = "InputField";

export default InputField;