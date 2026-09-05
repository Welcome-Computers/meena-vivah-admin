import { ROLE_TYPES } from "@/lib/modules/admin/admin.types";
import { App } from "antd";
import Form, { FormInstance, RuleObject } from "antd/es/form";
import { FocusEvent, memo, useEffect, useRef } from "react";
import style from "../../pages/profiles/style.module.css";
import CheckBoxField from "../InputElements/CheckBoxField";
import DobField from "../InputElements/DobField";
import HeightField from "../InputElements/HeightField";
import InputField from "../InputElements/InputField";
import SearchableSelectField, { SelectOption } from "../InputElements/SearchableSelectField";
import ProfileTable from "../profile/ProfileTable";


interface iProps {
  searchByMobileData: any,
  isLoadingByMobile: boolean,
  form: FormInstance,
  handleCreateOccupation: (value: string) => Promise<void | SelectOption>,
  occupatonOptions: any,
  isOccupationLoading: boolean,
  handleOnBlurMobile: (e: FocusEvent<HTMLInputElement, Element>) => Promise<void>
  callingFrom: string,
  userRole: ROLE_TYPES | null
  orignalData: any
}

const PersonalDetails = memo((props: iProps) => {

  const { modal } = App.useApp();

  const {
    callingFrom,
    isLoadingByMobile,
    searchByMobileData,
    form,
    handleCreateOccupation,
    occupatonOptions,
    isOccupationLoading,
    handleOnBlurMobile,
    userRole,
    orignalData
  } = props;

  const originalMobile = orignalData?.mobile;

  const mobile = Form.useWatch("mobile", form);

  const initializedRef = useRef(false);

  console.log("#####", orignalData)

  useEffect(() => {
    // Don't show modal during initial form population
    if (!initializedRef.current) {
      if (mobile === originalMobile) {
        initializedRef.current = true;
      }

      return;
    }

    // Nothing changed
    if (mobile === originalMobile) {
      return;
    }

    // Admin / Executive don't need this warning
    if (
      userRole === "admin" ||
      userRole === "executive"
    ) {
      return;
    }

    modal.confirm({
      title: "Important: Mobile Number Used for Login",
      content:
        "This mobile number is used to log in to this profile. Please use a number you can easily remember and access. If you lose access to this number, the administrator may not be able to help you recover your profile.",
      okText: "OK",
      cancelText: "Cancel",
      onCancel() {
        form.setFieldValue("mobile", originalMobile);
      },
    });
  }, [
    mobile,
    originalMobile,
    userRole,
    form,
    modal,
  ]);

  return (
    <div className={style["form-container"]}>
      <InputField
        name="mobile"
        label="Mobile"
        placeholder="e.g. 9988771234"
        onBlur={(e) => {
          const currentMobile = e.target.value;

          // No change
          if (currentMobile === originalMobile) {
            return;
          }

          // Admin / Executive can change mobile
          if (
            userRole === "admin" ||
            userRole === "executive"
          ) {
            handleOnBlurMobile?.(e);
            return;
          }

        }}
        rules={[
          {
            validator: (_: RuleObject, val: any) => {
              if (!val) {
                return Promise.resolve();
              }

              if (val.length < 10) {
                return Promise.reject(
                  new Error("Enter 10 Digit Mobile Number")
                );
              }

              if (!/^(\\+91)?[6-9]\d{9}$/.test(val)) {
                return Promise.reject(
                  new Error("Check Mobile Number")
                );
              }

              return Promise.resolve();
            },
          },
          {
            required: true,
            message: "Mobile number is required",
          },
        ]}
      />

      {/* View data Table of search by mobile */}
      {searchByMobileData?.items?.length > 0 ?
        <ProfileTable
          loading={isLoadingByMobile}
          data={searchByMobileData?.items || []}
          showAction={true}
          is_pick_current_data={true}
          callingFrom={callingFrom}
        />
        : null}

      <CheckBoxField
        form={form}
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Select Gender First" }]}
        options={[
          { option: "Boy", value: "boy" },
          { option: "Girl", value: "girl" },
        ]}
      />
      <CheckBoxField
        form={form}
        name="is_married"
        label="Married"
        rules={[{ required: true, message: "Select Gender First" }]}
        options={[
          { option: "Married", value: 1 },
          { option: "UnMarried", value: 0 },
        ]}
      />
      <InputField
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Enter first name " },
          { max: 30, message: "Maximum 30 characters" },
        ]}
      />

      <DobField
        name="dob"
        label="Date of Birth"
      />

      <HeightField
        name="height"
        label="Height"
      />

      <SearchableSelectField
        // mode="multiple"
        name={"occupation"}
        label={"Occupation"}
        allowCreate
        onCreateOption={handleCreateOccupation}
        options={occupatonOptions}
        loading={isOccupationLoading}
        placeholder="Select occupations"
        rules={[
          { required: true, message: "Enter Occupation " },
        ]}
      />

      <InputField
        name="occupation_details"
        label="Occupation Details"
        rules={[
          { max: 100, message: "Maximum 100 characters" },
        ]}
      />

      <InputField
        name="education"
        label="Education"
      />

    </div>
  );
});

PersonalDetails.displayName = "PersonalDetails";
export default PersonalDetails;
