import { Form } from "antd";
import { memo } from "react";
import style from "../../pages/profiles/style.module.css";
import RichTextEditor from "./ReactQuill";

const OtherDetails = memo((props: any) => {
  const { form } = props;

  return (
    <div className={style["form-container"]}>
      <Form.Item name="otherinfo">
        <label>Other Information</label>
        <RichTextEditor
          value={form.getFieldValue("otherinfo")}
          onChange={(value) =>
            form.setFieldValue("otherinfo", value)
          }
        />
      </Form.Item>
    </div>
  );
});

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
