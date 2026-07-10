import { parseBiodata } from "@/lib/helpers_uploader/biodataParser";
import { formatedEditableRecord } from "@/lib/utility/helper";
import { useAppSelector } from "@/redux/hooks";
import { Button, Form } from "antd";
import { memo, useEffect } from "react";
import style from "../../pages/profiles/style.module.css";
import RichTextEditor from "./ReactQuill";

interface iProps {
  callingFrom: 'update' | 'create';
}

const OtherDetails = memo((props: iProps) => {
  const { callingFrom } = props || {};

  const form = Form.useFormInstance();

  const { profile_data } = useAppSelector((state: any) => (state.profile));


  useEffect(() => {
    form.setFieldValue("old_detials", profile_data);
  }, [form, profile_data]);

  const hasProfileData =
    profile_data &&
    typeof profile_data === "object" &&
    Object.keys(profile_data).length > 0;

  const handleAutoFill = (fieldName: string) => {

    const html = form.getFieldValue(fieldName);

    if (!html) return;

    const parsedData = parseBiodata(html, 1);

    const editableRecord = formatedEditableRecord(parsedData)

    form.setFieldsValue(editableRecord);
  };

  return (
    <div className={style["form-container"]}>
      <div className={style["details_wrapper"]}>
        {hasProfileData && callingFrom === "update" ?
          <div className="full_detials">
            <Form.Item className="other_detials" name="old_detials">
              <label>Full Details</label>
              <RichTextEditor
                value={form?.getFieldValue?.("old_detials") || ""}
                onChange={(value) =>
                  form?.setFieldValue?.("old_detials", value)
                }
              />
            </Form.Item>
            <Button
              onClick={() => handleAutoFill("old_detials")} >
              Auto Fill from old_detials
            </Button>
          </div>
          : null}

        <Form.Item className="other_detials" name="otherinfo">
          <label>Other Information</label>

          <RichTextEditor
            value={form?.getFieldValue?.("otherinfo") || ""}
            onChange={(value) =>
              form?.setFieldValue?.("otherinfo", value)
            }
          />
          <Button
            onClick={() => handleAutoFill("otherinfo")}
          >Auto Fill from otherinfo</Button>
        </Form.Item>

      </div>
    </div>
  );
});

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
