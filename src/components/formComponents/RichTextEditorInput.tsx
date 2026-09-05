import { Form } from "antd";
import style from "src/styles/InputField.module.css";
import RichTextEditor from "./ReactQuill";

interface Props {
  className?: string;
  name: string;
  label: string;
}

const RichTextEditorInput = ({
  label,
  name = "info",
  className,
}: Props) => {
  return (
    <div
      className={`${className ?? ""} 
      ${style["richtext-editor-vertical"]}`}
    >
      <div className={style["richtext-editor-label"]}>
        <label htmlFor={name} title={label}>
          {label}
        </label>
      </div>

      <Form.Item name={name}>
        <RichTextEditor />
      </Form.Item>
    </div>
  );
};

export default RichTextEditorInput;