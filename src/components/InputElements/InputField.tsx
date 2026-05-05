

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

  console.log(123)

  return (
    <div 
  >
    
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
      

      <Form.Item name={name} rules={rules} style={{ marginBottom: '6px'  } } label={label}
      >
        <Input {...rest} maxLength={maxLength} size='small' style={{ outline:"none" ,borderRadius:"0" ,border:"2px solid #444444"}}/>
      </Form.Item>
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;



// import { Form, Input } from 'antd';
// import { InputProps } from 'antd/es/input';
// import { ReactNode, memo } from 'react';

// interface IProps extends Omit<InputProps, 'name'> {
//   name: string | string[];
//   label?: string | ReactNode;
//   rootClassName?: string;
//   rules?: Array<any>;
// }

// const InputField = memo((props: IProps) => {
//   const { label, name, rootClassName, maxLength, showCount = false, rules, ...rest } = props;

//   return (
//     <div className={`${rootClassName}`}>
    
//         <Form.Item noStyle dependencies={[name]}>
//           {({ getFieldValue }) => {
//             const value = getFieldValue(name) ?? '';
//             const count = value.length;
//             return showCount && maxLength ? (
//               <div className="d_flex al_center opacity_50 no_wrap">
//                 {count} / {maxLength}
//               </div>
//             ) : null;
//           }}
//         </Form.Item>
      

//       <Form.Item name={name} rules={rules} style={{ marginBottom: '6px' }} label={label}>
//         <Input {...rest} maxLength={maxLength} size='small'/>
//       </Form.Item>
//     </div>
//   );
// });

// InputField.displayName = 'InputField';
// export default InputField;