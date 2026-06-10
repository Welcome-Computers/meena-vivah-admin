import { Form, FormItemProps } from "antd";
import { ReactNode, memo } from "react";
import RangeSliderSelector from "../InputElements/RangeSliderSelector";

interface IProps {
  name: string | string[];
  label?: string | ReactNode;

  rules?: any[];
  dependencies?: any[];

  formItemProps?: FormItemProps;

  min?: number;
  max?: number;

  initialValue?: [number, number];
}

const AgeRangeField = memo(
  ({
    name,
    label,
    rules,
    dependencies,
    formItemProps,
    min = 18,
    max = 80,
    initialValue = [21, 35],
  }: IProps) => {
    return (
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        dependencies={dependencies}
        initialValue={initialValue}
        style={{ marginBottom: "6px" }}
        {...formItemProps}
      >
        <RangeSliderSelector
          min={min}
          max={max}
        />
      </Form.Item>
    );
  }
);

AgeRangeField.displayName =
  "AgeRangeField";

export default AgeRangeField;