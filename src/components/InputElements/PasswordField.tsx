import { Form, Input } from 'antd';
import { JSX, ReactNode, memo } from 'react';

const { Password } = Input;

interface IProps {
  name: string | string[];
  label?: string | ReactNode;
  rootClassName?: string;
}

const PasswordField = memo((props: IProps): JSX.Element => {
  const { label, rootClassName, name, ...rest } = props;

  return (
    <div className={`${rootClassName} common_input_label_design`}>
      {!!label && (
        <div className="ant-col ant-form-item-label">
          <label className="ant-form-item-required">
            <div className="custom_title">{label}</div>
          </label>
        </div>
      )}

      <Form.Item name={name} label={null}>
        <Password {...rest} />
      </Form.Item>
    </div>
  );
});

PasswordField.displayName = 'PasswordField';
export default PasswordField;