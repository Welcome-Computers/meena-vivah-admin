import { Form, Input } from 'antd';
import { JSX, ReactNode, memo } from 'react';

const { OTP } = Input;

interface IProps {
  name: string | string[];
  label?: string | ReactNode;
  length?: number;
  rootClassName?: string;
}

const OTPField = memo((props: IProps): JSX.Element => {
  const { label, rootClassName, length = 6, ...rest } = props;

  return (
    <div className={`${rootClassName} common_input_label_design`}>
      {!!label && (
        <div className="ant-col ant-form-item-label">
          <label className="ant-form-item-required">
            <div className="custom_title">{label}</div>
          </label>
        </div>
      )}

      <Form.Item {...rest} label={null}>
        <OTP length={length} />
      </Form.Item>
    </div>
  );
});

OTPField.displayName = 'OTPField';
export default OTPField;