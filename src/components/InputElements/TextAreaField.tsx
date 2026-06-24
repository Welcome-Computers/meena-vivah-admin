

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
    className, name, rootClassName, maxLength, ...rest } = props;

  return (
    <div className={`${rootClassName} common_input_label_design`}>
      <Form.Item {...props} style={{ marginBottom: '6px' }} label={label}
      //  labelCol={{ span: 5 }}     
      // wrapperCol={{ span: 19 }}
      >
        <TextArea
          {...rest}
          rows={rows}
          className="custom-input"
          placeholder={placeholder}
          disabled={disabled}
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
