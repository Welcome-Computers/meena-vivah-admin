

import { Form, Input } from 'antd';
import { InputProps } from 'antd/es/input';
import { ReactNode, memo } from 'react';

interface IProps extends Omit<InputProps, 'name'> {
  name: string | string[];
  label?: string | ReactNode;
  rootClassName?: string;
  rules?: Array<any>;
}

const InputField = memo((props: IProps) => {
  const { label, name, rootClassName, maxLength, showCount = false, rules, ...rest } = props;

  return (
    <div className={`${rootClassName} common_input_label_design`}>
      <div className="d_flex al_center jc_between gap_10">
        {!!label && (
          <div className="ant-col ant-form-item-label">
            <label className="ant-form-item-required">
              <div className="custom_title">{label}</div>
            </label>
          </div>
        )}

        <Form.Item noStyle dependencies={[name]}>
          {({ getFieldValue }) => {
            const value = getFieldValue(name) ?? '';
            const count = value.length;
            return showCount && maxLength ? (
              <div className="d_flex al_center opacity_50 no_wrap">
                {count} / {maxLength}
              </div>
            ) : null;
          }}
        </Form.Item>
      
      </div>

      <Form.Item name={name} rules={rules} style={{ marginBottom: '6px' }} label={null}>
        <Input {...rest} maxLength={maxLength} size='small'/>
      </Form.Item>
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;