import { Button, Form } from "antd";
import { Children, memo } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
const FormListComponent = memo((props: any) => {
  const { name, children, label, formListName } = props;

  return (
    <Form.List name={formListName}>
      {(fields, { add, remove }) => (
        <div>
          {fields.map((value) => (
            <div key={value.key}>
              {typeof children === "function" ? children(value) : children}
            </div>
          ))}
          {fields.length > 1 && (
            <Button
              style={{ float: "right" }}
              size="small"
              onClick={() => remove(fields.length - 1)}
              icon={<CloseOutlined />}
            ></Button>
          )}

          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => add()}
          ></Button>
        </div>
      )}
    </Form.List>
  );
});

FormListComponent.displayName = "FormListComponent";
export default FormListComponent;

// import { Button, Form } from "antd";
// import { Children, memo } from "react";

// const FormListComponent = memo((props: any) => {
//   const { name, children, label, formListName } = props;

//   return (
//     <Form.List name={formListName}>
//       {(fields, { add, remove }) => (
//         <div>
//           {fields.map((value) => (
//             <div
//               key={value.key}
//             >
//               {typeof children === "function" ? children(value) : children}
//               {fields.length >1 &&
//               <Button
//                 onClick={() => remove(value.name)}
//                 // style={{ marginTop: "4%" }}
//               >
//                 Remove
//               </Button> }
//             </div>
//           ))}
//           <Button onClick={() => add()}>Add</Button>
//         </div>
//       )}
//     </Form.List>
//   );
// });

// FormListComponent.displayName = "FormListComponent";
// export default FormListComponent;
