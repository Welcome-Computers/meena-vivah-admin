import { parseBiodata } from "@/lib/helpers_uploader/biodataParser";
import { formatedEditableRecord } from "@/lib/utility/helper";
import { useAppSelector } from "@/redux/hooks";
import style from "@/styles/profileStyle.module.css";
import { Button, FormInstance } from "antd";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import RichTextEditorInput from "./RichTextEditorInput";

interface iProps {
  callingFrom: 'update' | 'create';
  form: FormInstance;
}

const OtherDetails = (props: iProps) => {
  const { callingFrom, form } = props || {};

  // const form = Form.useFormInstance();
  // const otherinfoValue = form?.getFieldValue?.("otherinfo")
  // console.log(formData)
  // console.log("++++++ ", otherinfoValue)

  const { profile_data } = useAppSelector((state: any) => (state.profile));

  useEffect(() => {
    if (!isEmpty(profile_data)) {
      form.setFieldValue("old_detials", profile_data);
    }
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
            <RichTextEditorInput
              label="Full Details"
              name="old_detials"
            />
            <Button
              onClick={() => handleAutoFill("old_detials")}>
              Auto Fill from old_detials
            </Button>
          </div>
          : null}

        <RichTextEditorInput
          label="Other Information"
          name="otherinfo"
        />

        <Button
          onClick={() => handleAutoFill("otherinfo")}>
          Auto Fill from otherinfo
        </Button>

      </div>
    </div>
  );
};

OtherDetails.displayName = "OtherDetails";
export default OtherDetails;
