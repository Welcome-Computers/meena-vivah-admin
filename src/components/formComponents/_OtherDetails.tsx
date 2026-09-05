import { parseBiodata } from "@/lib/helpers_uploader/biodataParser";
import { formatedEditableRecord } from "@/lib/utility/helper";
import { useAppSelector } from "@/redux/hooks";
import { Button, Form, FormInstance } from "antd";
import { isEmpty } from "lodash";
import { memo, useCallback, useEffect } from "react";
import style from "../../pages/profiles/style.module.css";
import RichTextEditor from "./ReactQuill";

interface IProps {
  callingFrom: "update" | "create";
  form: FormInstance;
}

const OtherDetails = memo(({ callingFrom, form }: IProps) => {
  const { profile_data } = useAppSelector(
    (state: any) => state.profile
  );

  /**
   * Set old details when profile data is available.
   */
  useEffect(() => {
    if (!isEmpty(profile_data)) {
      form.setFieldValue("old_detials", profile_data);
    }
  }, [form, profile_data]);

  /**
   * Check whether profile data exists.
   */
  const hasProfileData = !isEmpty(profile_data);

  /**
   * Auto-fill form fields from rich text HTML.
   */
  const handleAutoFill = useCallback(
    (fieldName: "old_detials" | "otherinfo") => {
      const html = form.getFieldValue(fieldName);

      if (!html) return;

      const parsedData = parseBiodata(html, 1);
      const editableRecord = formatedEditableRecord(parsedData);

      form.setFieldsValue(editableRecord);
    },
    [form]
  );

  return (
    <div className={style["form-container"]}>
      <div className={style["details_wrapper"]}>
        {callingFrom === "update" && hasProfileData && (
          <div className="full_detials">
            <Form.Item
              className="other_detials"
              name="old_detials"
            >
              <label>Full Details</label>

              <RichTextEditor />
            </Form.Item>

            <Button
              type="default"
              onClick={() => handleAutoFill("old_detials")}
            >
              Auto Fill from Full Details
            </Button>
          </div>
        )}

        <Form.Item
          className="other_detials"
          name="otherinfo"
        >
          <label>Other Information</label>

          <RichTextEditor />
        </Form.Item>

        <Button
          type="default"
          onClick={() => handleAutoFill("otherinfo")}
        >
          Auto Fill from Other Information
        </Button>
      </div>
    </div>
  );
});

OtherDetails.displayName = "OtherDetails";

export default OtherDetails;