

import { Form, Input } from 'antd';
import { JSX, ReactNode, memo } from 'react';

const { TextArea } = Input;

interface IProps {
  name: string | string[];
  label?: string | ReactNode;
  placeholder?: string;
  disabled?: boolean;
  rules?: Array<any>;
  rows?: number;
  className?: string;
  rootClassName?: string;
  [k: string]: any;
  style?: any;
}

const TextAreaField = memo((props: IProps): JSX.Element => {
  const { placeholder, label, disabled, rows, 
    className, name, rootClassName, showCount = false, maxLength, ...rest } = props;

  return (
    <div className={`${rootClassName} common_input_label_design`}>
      <div className="d_flex al_center jc_between gap_10">
        {!!label && (
          <div className="ant-col ant-form-item-label">
            <label htmlFor="terms_and_conditions_description" className="ant-form-item-required" title="">
              <div className="custom_title">{label}</div>
            </label>
          </div>
        )}
        <Form.Item noStyle dependencies={[name]}>
          {({ getFieldValue }) => {
            const text = getFieldValue(name) ?? '';
            const count = text?.length;
            return <>{showCount && <div>{count >= 0 ? `${count} / ${maxLength}` : maxLength}</div>}</>;
          }}
        </Form.Item>
      </div>
      <Form.Item {...props} style={{ marginBottom: '6px' }} label={null}>
        <TextArea
        size='small'
          {...rest}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          onChangeCapture={(ev) => {
            const { value } = ev.currentTarget;
            ev.currentTarget.value = value.replaceAll('\r\n', '\n');
          }}
        />
      </Form.Item>
    </div>
  );
});

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
